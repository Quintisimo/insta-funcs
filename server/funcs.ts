"use server";
import fs from "node:fs/promises";
import { getPackages } from "~/utils/code";
import { FOLDER_PATH } from "~/utils/constants";
import { installDeps, uninstallDeps } from "~/utils/deps";
import { getFuncFilePath } from "~/utils/funcs";

export async function addFunc(code: string, name: string, method: string) {
  const filePath = getFuncFilePath(name, method);
  const pkgs = getPackages(code);
  await fs.writeFile(filePath, code);
  if (pkgs.length) installDeps(pkgs);
}

export async function getFuncs() {
  const files = (await fs.readdir(FOLDER_PATH)).filter(
    // filter out hidden files
    (name) => !name.startsWith("."),
  );
  return {
    headers: ["Route", "Method"],
    rows: files.map((file) => {
      const name = file.substring(0, file.indexOf("."));
      const method = file.substring(
        file.indexOf(".") + 1,
        file.lastIndexOf("."),
      );

      return {
        name: name,
        method: method,
        route: `/${name}.${method}`,
      };
    }),
  };
}

export async function removeOldFunc(name: string, method: string) {
  const filePath = getFuncFilePath(name, method);
  const content = await fs.readFile(filePath, "utf8");
  const pkgs = getPackages(content);
  if (pkgs.length) uninstallDeps(pkgs);
  await fs.unlink(filePath);
}

export async function getFuncContent(name: string, method: string) {
  const filePath = getFuncFilePath(name, method);
  const content = await fs.readFile(filePath, "utf8");
  return content;
}
