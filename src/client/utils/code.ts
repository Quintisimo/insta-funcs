export function getNpmPackages(code: string) {
  return code
    .split("\n")
    .filter((line) => line.startsWith("import"))
    .map((line) => line.match(/("|')(.*)("|')/)?.[2])
    .filter(Boolean)
    .reduce<Record<string, string>>(
      (acc, pkg) => ({
        ...acc,
        [pkg]: "latest", // Default to latest version for simplicity
      }),
      {}
    );
}
