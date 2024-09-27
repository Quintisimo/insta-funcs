import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { FOLDER_PATH } from "./constants";
import { getPackages } from "./code";

function pnpm(args: string[]) {
  return spawnSync("pnpm", args, { cwd: process.cwd() });
}

export function installDeps(pkgs: string[]) {
  pnpm(["add", ...pkgs]);
}

export function uninstallDeps(pkgs: string[]) {
  pnpm(["un", ...pkgs]);
}

export function installAllDeps() {
  const fileNames = fs.readdirSync(FOLDER_PATH);
  const packages = fileNames
    .flatMap((fileName) => {
      const filePath = path.join(FOLDER_PATH, fileName);
      const code = fs.readFileSync(filePath, "utf8");
      return getPackages(code);
    })
    .filter(function (pkg, index, self) {
      return self.indexOf(pkg) == index;
    });
  installDeps(packages);
}
