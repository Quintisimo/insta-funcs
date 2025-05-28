import vm from "node:vm";
import { ImportHandler } from "../client/utils/types";

export async function runCode(code: string, url: string, body: unknown) {
  const module: Record<"exports", Partial<ImportHandler>> = { exports: {} };
  await vm.runInContext(code, vm.createContext({ module }));

  if (typeof module.exports.handler !== "function") {
    throw new Error("No handler function found in the code.");
  }

  const result = await vm.runInContext(
    "handler(args)",
    vm.createContext({
      handler: module.exports.handler,
      fetch,
      args: {
        url,
        body,
      },
    })
  );

  return result;
}
