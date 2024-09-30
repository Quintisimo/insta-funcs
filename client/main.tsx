import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FuncForm from "./routes/func-form";

import "./main.css";

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
      console.log(Object.fromEntries(formData));
      return null;
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
