import { atom } from "jotai";
import { getPackages } from "../utils/code";
import { handlerArgsStr } from "../utils/types";

const type = handlerArgsStr;
const typeName = type.match(/type (.*) =/)[1];

const initialCode = `export function handler(args: ${typeName}) {
  // Implement code here
}`;

export const codeAtom = atom(initialCode);

export const nameAtom = atom("");

export const httpMethods = ["get", "post", "put", "delete"] as const;
export type HttpMethods = (typeof httpMethods)[number];
export const methodAtom = atom<HttpMethods>("get");

export const errorsAtom = atom<string[]>([]);

export const packagesAtom = atom((get) => getPackages(get(codeAtom)));
