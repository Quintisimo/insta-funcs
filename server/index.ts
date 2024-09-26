import { eventHandler, getRequestURL } from "vinxi/http";
import { serverRouter } from "../app.config";

export default eventHandler(async (event) => {
  const url = getRequestURL(event);
  const route = url.pathname.replace(serverRouter.base, "");
  return new Response(route);
});
