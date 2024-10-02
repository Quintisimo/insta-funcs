import type { Params } from "react-router-dom";

export function getPackages(code: string) {
  return code
    .split("\n")
    .filter((line) => line.startsWith("import"))
    .map((line) => line.match(/("|')(.*)("|')/)?.[2])
    .filter(Boolean);
}

export function getFuncNameandMethod(params: Params) {
  const { id } = params;
  const [name, method] = id.split(".");
  return {
    name,
    method,
  };
}
