import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createFunc, updateFunc } from "~/routes/func-form/action";
import FuncForm from "~/routes/func-form/component";
import { getFunc, newFunc } from "~/routes/func-form/loader";
import Home from "~/routes/home/component";
import { getAllFuncs } from "~/routes/home/loader";
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

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <FluentProvider theme={webLightTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </StrictMode>,
  );
}
