import { atom } from "jotai";
import { handlerArgsStr } from "~/utils/types";

const type = handlerArgsStr;
const typeName = type.match(/type (.*) =/)[1];

export const initialCode = `export async function handler(args: ${typeName}): Promise<Record<string, unknown>> {
  // Implement code here
  return {};
}`;

export const codeAtom = atom(initialCode);

export const nameAtom = atom("");

export const httpMethods = ["get", "post", "put", "delete"] as const;

export const methodAtom = atom("");

export const errorsAtom = atom<string[]>([]);
