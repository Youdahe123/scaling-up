export function withBasePath(path: string) {
  // Absolute URLs and data URIs (e.g. diagrams exported inline from the
  // editor) must never get the Pages basePath prefixed onto them.
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
