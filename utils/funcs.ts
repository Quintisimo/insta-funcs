import path from "node:path";
import fs from "node:fs";
import { tsImport } from "tsx/esm/api";
import { FOLDER_PATH } from "./constants";
import { HandlerArgs } from "../utils/funcArgTypes";

export function createFuncsFolder() {
  if (fs.existsSync(FOLDER_PATH)) return;
  fs.mkdirSync(FOLDER_PATH);
}

type ImportHandler = {
  handler(args: HandlerArgs): Promise<Record<string, unknown>>;
};

export async function getFunc(route: string) {
  const filePath = path.join(FOLDER_PATH, `${route}.ts`);
  if (!fs.existsSync(filePath)) {
    throw new Error("Function does not exist");
  }
  const { handler } = (await tsImport(
    filePath,
    import.meta.url,
  )) as ImportHandler;
  return handler;
}
