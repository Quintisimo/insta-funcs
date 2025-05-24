import devServer from "@hono/vite-dev-server";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Change the import to use your runtime specific build
import build from "@hono/vite-build/node";

export default defineConfig(({ mode }) => {
  if (mode === "client")
    return {
      build: {
        rollupOptions: {
          input: [
            "./src/client/index.tsx",
            "./src/client/styles/style.css",
            "./src/client/public/logo.svg",
          ],
          output: {
            entryFileNames: "static/index.js",
            assetFileNames: "static/[name][extname]",
          },
        },
      },
      plugins: [tailwindcss()],
    };

  return {
    plugins: [
      build({
        entry: "src/server/index.tsx",
        staticPaths: ["/static/*"],
      }),
      devServer({
        entry: "src/server/index.tsx",
      }),
      tailwindcss(),
    ],
  };
});
