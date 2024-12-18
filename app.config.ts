import griffel from "@griffel/vite-plugin";
import { serverFunctions } from "@vinxi/server-functions/plugin";
import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import tsPaths from "vite-tsconfig-paths";

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
      plugins: () => [
        tsPaths(),
        reactRefresh(),
        serverFunctions.client(),
        process.env.NODE_ENV === "build" && griffel(),
      ],
    },
    {
      name: "rest",
      type: "http",
      handler: "./rest/index.ts",
      target: "server",
      base: serverBase,
      plugins: () => [tsPaths()],
    },
    serverFunctions.router({
      plugins: () => [tsPaths()],
    }),
  ],
});
