import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FuncForm from "./routes/func-form";

import "./main.css";
import { addFunc } from "../server/add-func";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/new",
    element: <FuncForm />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const code = formData.get("code").toString();
      addFunc(code);
      return null;
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
