import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import Home from "./routes/home/component";
import { getAllFuncs } from "./routes/home/loader";

import FuncForm from "./routes/func-form/component";
import { getFunc, newFunc } from "./routes/func-form/loader";
import { createFunc, updateFunc } from "./routes/func-form/action";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: getAllFuncs,
    element: <Home />,
  },
  {
    path: "/new",
    loader: newFunc,
    element: <FuncForm />,
    action: createFunc,
  },
  {
    path: "/:id",
    loader: getFunc,
    element: <FuncForm />,
    action: updateFunc,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </StrictMode>,
);
