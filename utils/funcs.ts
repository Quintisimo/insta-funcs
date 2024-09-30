import path from "node:path";
import fs from "node:fs";
import { tsImport } from "tsx/esm/api";
import { FOLDER_PATH } from "./constants";
import { ImportHandler } from "./types";
import { HTTPMethod } from "vinxi/http";

export async function getFunc(route: string, method: HTTPMethod) {
  const filePath = getFuncFilePath(route, method);
  if (!fs.existsSync(filePath)) return;

  const { handler } = (await tsImport(
    filePath,
    import.meta.url,
  )) as ImportHandler;
  return handler;
}

export function getFuncFilePath(route: string, method: HTTPMethod) {
  return path.join(FOLDER_PATH, `${route}.${method.toLowerCase()}.ts`);
}
