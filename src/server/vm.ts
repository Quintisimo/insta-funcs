import vm from "node:vm";

export function runCode(code: string, url: string, body: unknown) {
  return vm.runInContext(
    `${code}; handler(args)`,
    vm.createContext({
      console,
      fetch,
      args: {
        url,
        body,
      },
    })
  );
}
