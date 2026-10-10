import { inspectPackage, contentType, CHUNK_SIZE } from "./packages.mjs";
import { id, now, problem } from "./domain.mjs";
import { update } from "./store.mjs";

export async function importUpload(store, files, user, uploadId) {
  let job = await store.get(`uploads/${uploadId}`, { type: "json" });
  if (!job || job.userId !== user.id || user.role !== "admin")
    throw problem(403, "You cannot import this package.");
  if (job.status === "ready") return job;
  const started = await update(store, `uploads/${uploadId}`, (current) => {
    if (current.status === "processing")
      throw problem(409, "This package is already being processed.");
    return { ...current, status: "processing", progress: 0 };
  });
  job = started;
  try {
    const parts = [];
    for (let part = 0; part < Math.ceil(job.size / CHUNK_SIZE); part++) {
      const chunk = await files.get(`uploads/${uploadId}/${part}`, {
        type: "arrayBuffer",
      });
      if (!chunk)
        throw problem(
          400,
          "Some upload chunks are missing. Please upload the package again.",
        );
      parts.push(Buffer.from(chunk));
    }
    const archive = Buffer.concat(parts);
    if (archive.length !== job.size)
      throw problem(400, "The uploaded package size does not match.");
    const inspected = inspectPackage(new Uint8Array(archive), job.filename);
    const courseId = id();
    const assetPrefix = `packages/${courseId}`;
    const assets = Object.entries(inspected.files);
    for (let start = 0; start < assets.length; start += 12) {
      await Promise.all(
        assets.slice(start, start + 12).map(([path, bytes]) =>
          files.set(`${assetPrefix}/${path}`, bytes, {
            metadata: { type: contentType(path) },
          }),
        ),
      );
      await store.setJSON(`uploads/${uploadId}`, {
        ...job,
        status: "processing",
        progress: Math.round(((start + 12) / assets.length) * 100),
      });
    }
    const course = {
      id: courseId,
      title:
        job.title ||
        inspected.suggestedTitle ||
        job.filename.replace(/\.[^.]+$/, ""),
      description: job.description,
      minutes: job.minutes,
      format: inspected.format,
      lessons: inspected.lessons,
      assetPrefix,
      published: false,
      icon: "idea",
      createdAt: now(),
      createdBy: user.id,
    };
    await store.setJSON(`courses/${courseId}`, course, { onlyIfNew: true });
    const complete = { ...job, status: "ready", progress: 100, courseId };
    await store.setJSON(`uploads/${uploadId}`, complete);
    await Promise.all(
      parts.map((_, part) => files.delete(`uploads/${uploadId}/${part}`)),
    );
    return complete;
  } catch (error) {
    await store.setJSON(`uploads/${uploadId}`, {
      ...job,
      status: "failed",
      error: error.status
        ? error.message
        : "This package could not be processed. Try exporting it again.",
    });
    throw error;
  }
}
