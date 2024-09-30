export function getPackages(code: string) {
  return code
    .split("\n")
    .filter((line) => line.startsWith("import"))
    .map((line) => line.match(/("|')(.*)("|')/)?.[2])
    .filter(Boolean);
}
