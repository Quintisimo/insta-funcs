import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { vValidator } from "@hono/valibot-validator";
import { createInsertSchema } from "drizzle-valibot";
import { renderToString } from "react-dom/server";
import { staticPath } from "./utils";

import { functions } from "./db/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { runCode } from "./vm";

const app = new Hono();

app.get(
  "/favicon.svg",
  serveStatic({
    root: "./",
    rewriteRequestPath: () => staticPath("public/logo.svg", "logo.svg"),
  })
);

app.on(["GET", "POST"], "/func/:id", async (c) => {
  const id = c.req.param("id");
  const code = await db.query.functions.findFirst({
    columns: {
      compiledCode: true,
    },
    where: and(
      eq(functions.id, Number(id)),
      eq(functions.method, c.req.method as "GET" | "POST")
    ),
  });
  if (!code) {
    return c.text("Function not found", 404);
  }

  const requestBody = c.req.method === "POST" ? c.req.json() : undefined;
  const result = await runCode(code.compiledCode, c.req.url, requestBody);
  console.log(result);
  return c.json(result);
});

const apiRoutes = app.post(
  "/api/function",
  vValidator("json", createInsertSchema(functions)),
  async (c) => {
    const body = c.req.valid("json");
    await db.insert(functions).values(body);
    return c.json({ success: true });
  }
);

export type AppType = typeof apiRoutes;

app.get("/", (c) => {
  // Needed for web containers to work correctly
  c.header("Cross-Origin-Embedder-Policy", "require-corp");
  c.header("Cross-Origin-Opener-Policy", "same-origin");

  const html = renderToString(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="icon"
          href="/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        ></link>
        <link
          rel="stylesheet"
          href={staticPath("styles/style.css", "style.css")}
        />
        <script type="module" src={staticPath("index.tsx", "index.js")} />
      </head>
      <body data-theme="macchiato" className="bg-ctp-base">
        <div id="root" />
      </body>
    </html>
  );

  return c.html(`<!DOCTYPE html>${html}`);
});

export default app;
