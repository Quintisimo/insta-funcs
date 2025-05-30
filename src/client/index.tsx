import { hc } from "hono/client";

import { createRoot } from "react-dom/client";
import Editor from "./components/editor";

import { StrictMode } from "react";
import type { AppType } from "../server";

export const client = hc<AppType>("/");

function App() {
  return (
    <>
      <Editor />
    </>
  );
}

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
