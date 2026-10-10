import { useCallback, useEffect, useState } from "react";
export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch("/api/lms/" + path, {
    credentials: "same-origin",
    ...options,
    headers: {
      ...(typeof options.body === "string"
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  });
  const value = await response.json().catch(() => ({
    error: "The service could not be reached. Please try again.",
  }));
  if (!response.ok)
    throw new APIError(
      value.error || "This request could not be completed.",
      response.status,
    );
  return value;
}
export function post<T>(path: string, value: unknown) {
  return api<T>(path, { method: "POST", body: JSON.stringify(value) });
}
export function useData<T>(path: string) {
  const [data, setData] = useState<T | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    api<T>(path, { signal: controller.signal })
      .then((value) => {
        setData(value);
        setLoading(false);
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setError(error.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [path, version]);
  return { data, setData, error, loading, reload };
}
