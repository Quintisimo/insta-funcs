import { hc } from "hono/client";
import { createRoot } from "react-dom/client";
import Editor from "./editor";

import type { AppType } from "../server";

export const client = hc<AppType>("/");

function App() {
  return <Editor />;
}

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<App />);
