import { atom } from "jotai";
import { getPackages } from "../utils/code";
import { getHandlerArgsTypeStr } from "../utils/code";

const type = getHandlerArgsTypeStr();
const typeName = type.match(/type (.*) =/)[1];

const initialCode = `export function handler(args: ${typeName}) {
  // Implement code here
}`;

export const codeAtom = atom(initialCode);

export const errorsAtom = atom<string[]>([]);

export const packagesAtom = atom((get) => getPackages(get(codeAtom)));
