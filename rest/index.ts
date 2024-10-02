import { eventHandler, getRequestURL, readBody } from "vinxi/http";
import { getFunc } from "~/utils/funcs";
import { serverBase } from "../app.config";

export default eventHandler(async (event) => {
  const url = getRequestURL(event);
  let body: unknown;

  if (["POST", "PUT"].includes(event.method)) {
    body = readBody(event);
  }
  const route = url.pathname.replace(serverBase, "");
  try {
    const handler = await getFunc(route, event.method);
    const response = await handler({ url, body });
    return Response.json(response);
  } catch (error) {
    let msg = "Function does not exist";
    if (error instanceof Error) {
      msg = error.message;
    }
    return Response.json({
      error: msg,
    });
  }
});
