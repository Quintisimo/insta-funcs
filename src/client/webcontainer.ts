import { FileSystemTree } from "@webcontainer/api";

export function getContainerFiles(
  name: string,
  content: string
): FileSystemTree {
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
            "build": "esbuild function.ts --bundle --outfile=function.js --platform=node"
          },
          "dependencies": ${JSON.stringify({
            esbuild: "latest",
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
