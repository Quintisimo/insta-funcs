import fs from "node:fs";
import path from "node:path";
import { tsImport } from "tsx/esm/api";
import type { HTTPMethod } from "vinxi/http";
import { FOLDER_PATH } from "./constants";
import type { ImportHandler } from "./types";

export async function getFunc(route: string, method: HTTPMethod) {
  const filePath = getFuncFilePath(route, method);
  if (!fs.existsSync(filePath)) return;

  const { handler } = (await tsImport(
    filePath,
    import.meta.url,
  )) as ImportHandler;
  return handler;
}

export function getFuncFilePath(route: string, method: string) {
  return path.join(FOLDER_PATH, `${route}.${method.toLowerCase()}.ts`);
}
