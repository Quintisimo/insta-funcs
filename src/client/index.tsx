import { hc } from "hono/client";

import { createRoot } from "react-dom/client";
import Editor from "./components/editor";

import type { AppType } from "../server";
import { StrictMode } from "react";

export const client = hc<AppType>("/");

function App() {
  return (
    <>
      <Editor />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
