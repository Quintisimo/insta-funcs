export function staticPath(devPath: string, prodPath: string): string {
  if (import.meta.env.PROD) {
    return `/static/${prodPath}`;
  }
  return `/src/client/${devPath}`;
}
