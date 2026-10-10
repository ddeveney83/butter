import {
  mkdir,
  readFile,
  writeFile,
  rename,
  readdir,
  unlink,
} from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

// Development uses the same async storage contract as Netlify Blobs.
export class FileStore {
  constructor(directory) {
    this.directory = directory;
    this.locks = new Map();
  }
  path(key) {
    return join(
      this.directory,
      Buffer.from(key).toString("base64url") + ".json",
    );
  }
  async getWithMetadata(key, options = {}) {
    try {
      const row = JSON.parse(await readFile(this.path(key), "utf8"));
      const bytes = Buffer.from(row.data, "base64");
      return {
        etag: row.etag,
        metadata: row.metadata || {},
        data:
          options.type === "json"
            ? JSON.parse(bytes.toString())
            : options.type === "text"
              ? bytes.toString()
              : bytes.buffer.slice(
                  bytes.byteOffset,
                  bytes.byteOffset + bytes.byteLength,
                ),
      };
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async get(key, options = {}) {
    return (await this.getWithMetadata(key, options))?.data ?? null;
  }
  async set(key, value, options = {}) {
    const previous = this.locks.get(key) || Promise.resolve();
    const work = previous
      .catch(() => {})
      .then(async () => {
        await mkdir(this.directory, { recursive: true });
        const existing = await this.getWithMetadata(key);
        if (
          (options.onlyIfNew && existing) ||
          (options.onlyIfMatch && existing?.etag !== options.onlyIfMatch)
        )
          return { modified: false };
        const etag = randomUUID();
        const bytes =
          typeof value === "string" ? Buffer.from(value) : Buffer.from(value);
        const temporary = this.path(key) + "." + randomUUID();
        await writeFile(
          temporary,
          JSON.stringify({
            key,
            etag,
            data: bytes.toString("base64"),
            metadata: options.metadata || {},
          }),
        );
        await rename(temporary, this.path(key));
        return { modified: true, etag };
      });
    this.locks.set(key, work);
    try {
      return await work;
    } finally {
      if (this.locks.get(key) === work) this.locks.delete(key);
    }
  }
  setJSON(key, value, options = {}) {
    return this.set(key, JSON.stringify(value), options);
  }
  async list({ prefix = "" } = {}) {
    await mkdir(this.directory, { recursive: true });
    const blobs = [];
    for (const filename of await readdir(this.directory)) {
      if (!filename.endsWith(".json")) continue;
      const key = Buffer.from(filename.slice(0, -5), "base64url").toString();
      if (!key.startsWith(prefix)) continue;
      try {
        const row = JSON.parse(
          await readFile(join(this.directory, filename), "utf8"),
        );
        blobs.push({ key: row.key, etag: row.etag });
      } catch (error) {
        // A course session may close while another request lists records.
        if (error.code !== "ENOENT") throw error;
      }
    }
    return { blobs };
  }
  async delete(key) {
    try {
      await unlink(this.path(key));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

export async function entries(store, prefix) {
  const keys = [];
  let cursor;
  do {
    const page = await store.list({ prefix, cursor });
    keys.push(...page.blobs.map((blob) => blob.key));
    cursor = page.cursor;
  } while (cursor);
  const result = [];
  for (let index = 0; index < keys.length; index += 12) {
    result.push(
      ...(await Promise.all(
        keys
          .slice(index, index + 12)
          .map((key) => store.get(key, { type: "json" })),
      )),
    );
  }
  return result.filter(Boolean);
}

export async function update(store, key, change) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const previous = await store.getWithMetadata(key, { type: "json" });
    const next = await change(previous?.data ?? null);
    const result = await store.setJSON(
      key,
      next,
      previous ? { onlyIfMatch: previous.etag } : { onlyIfNew: true },
    );
    if (result.modified) return next;
  }
  throw Object.assign(
    new Error("This record changed while saving. Please try again."),
    { status: 409 },
  );
}
