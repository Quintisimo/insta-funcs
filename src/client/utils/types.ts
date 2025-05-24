export const handlerArgsStr = `
  type HandlerArgs = {
    url: URL;
    body: unknown;
  };
`;

type HandlerArgs = {
  url: URL;
  body: unknown;
};

export type ImportHandler = {
  handler(args: HandlerArgs): Promise<Record<string, unknown>>;
};
