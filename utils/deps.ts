import { spawnSync } from "node:child_process";

function pnpm(args: string[]) {
  return spawnSync("pnpm", args, { cwd: process.cwd() });
}

export function installDeps(pkgs: string[]) {
  pnpm(["add", ...pkgs]);
}

export function uninstallDeps(pkgs: string[]) {
  pnpm(["un", ...pkgs]);
}
