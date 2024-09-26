import { eventHandler, getRequestURL, readBody } from "vinxi/http";

import { serverRouter } from "../app.config";
import { createFuncsFolder, getFunc } from "../utils/funcs";

createFuncsFolder();

export default eventHandler(async (event) => {
  console.log(event.method);
  const url = getRequestURL(event);
  const body = readBody(event);
  const route = url.pathname.replace(serverRouter.base, "");
  const handler = await getFunc(route);
  const response = await handler({ url, body });
  return new Response(JSON.stringify(response));
});
