import reactRefresh from "@vitejs/plugin-react";
import tsPaths from "vite-tsconfig-paths";
import { createApp, RouterSchemaInput } from "vinxi";
import { createFuncsFolder } from "./utils/funcs";
import { installAllDeps } from "./utils/deps";

createFuncsFolder();
installAllDeps();

export const serverRouter = {
  name: "server",
  type: "http",
  handler: "./server/index.ts",
  target: "server",
  base: "/api",
  plugins: () => [tsPaths()],
} satisfies RouterSchemaInput;

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
      plugins: () => [tsPaths(), reactRefresh()],
    },
    serverRouter,
  ],
});
