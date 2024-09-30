import funcTypeString from "../utils/funcArgTypes?raw";

export function getPackages(code: string) {
  return code
    .split("\n")
    .filter((line) => line.startsWith("import"))
    .map((line) => line.match(/("|')(.*)("|')/)?.[2])
    .filter(Boolean);
}

export function getHandlerArgsTypeStr() {
  return funcTypeString.replace("export ", "").trim();
}
