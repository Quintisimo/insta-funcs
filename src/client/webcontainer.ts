import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { client } from ".";
import { getNpmPackages } from "./utils/code";

export function getContainerFiles(
  name: string,
  content: string
): FileSystemTree {
  const npmPackages = getNpmPackages(content);

  return {
    "package.json": {
      file: {
        contents: `
        {
          "name": "${name}",
          "private": true,
          "version": "1.0.0",
          "type": "module",
          "scripts": {
            "build": "esbuild function.ts --bundle --outfile=function.js --platform=node --tree-shaking=false"
          },
          "dependencies": ${JSON.stringify({
            esbuild: "latest",
            ...npmPackages,
          })}
        }`,
      },
    },
    "function.ts": {
      file: {
        contents: content,
      },
    },
  };
}

export async function saveCode(
  name: string,
  code: string,
  method: "GET" | "POST"
) {
  if (!name) return alert("Please enter a function name.");

  const functionFiles = getContainerFiles(name, code);
  const webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(functionFiles);

  const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) throw new Error("Failed to install dependencies.");

  const buildProcess = await webcontainerInstance.spawn("npm", [
    "run",
    "build",
  ]);
  const buildExitCode = await buildProcess.exit;
  console.log("Build exit code:", buildExitCode);

  if (buildExitCode !== 0) throw new Error("Build failed.");

  const compiledCode = await webcontainerInstance.fs.readFile(
    "/function.js",
    "utf-8"
  );
  console.log("Built file content:", compiledCode);

  await client.api.function.$post({
    json: {
      name,
      originalCode: code,
      compiledCode,
      method,
    },
  });
  webcontainerInstance.teardown();
}
