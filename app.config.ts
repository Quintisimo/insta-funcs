import reactRefresh from "@vitejs/plugin-react";
import tsPaths from "vite-tsconfig-paths";
import { serverFunctions } from "@vinxi/server-functions/plugin";
import { createApp } from "vinxi";

export const serverBase = "/rest";

export default createApp({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public",
    },
    {
      name: "client",
      type: "spa",
      handler: "./client/index.ts",
      target: "browser",
      plugins: () => [tsPaths(), reactRefresh(), serverFunctions.client()],
    },
    {
      name: "rest",
      type: "http",
      handler: "./rest/index.ts",
      target: "server",
      base: serverBase,
    },
    serverFunctions.router({
      plugins: () => [tsPaths()],
    }),
  ],
});
