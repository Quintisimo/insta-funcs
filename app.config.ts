import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";

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
      plugins: () => [reactRefresh()],
    },
  ],
});
