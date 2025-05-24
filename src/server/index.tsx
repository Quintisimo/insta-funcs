import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { renderToString } from "react-dom/server";
import { staticPath } from "./utils";

const app = new Hono();

app.get(
  "/favicon.svg",
  serveStatic({
    root: "./",
    rewriteRequestPath: () => staticPath("public/logo.svg", "logo.svg"),
  })
);

const routes = app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
});

export type AppType = typeof routes;

app.get("/", (c) => {
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
        <script
          type="module"
          src={staticPath("client/index.tsx", "index.js")}
        />
      </head>
      <body data-theme="macchiato" className="bg-ctp-base">
        <div id="root" />
      </body>
    </html>
  );

  return c.html(`<!DOCTYPE html>${html}`);
});

export default app;
