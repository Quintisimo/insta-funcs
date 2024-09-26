import { atom } from "jotai";
import { getPackages } from "../utils/code";
import funcTypeString from "../utils/funcArgTypes?raw";

const type = funcTypeString.replace("export ", "").trim();
const typeName = type.match(/type (.*) =/)[1];

const initialCode = `${type}

export function handler(args: ${typeName}) {
  // Implement code here
}`;

export const codeAtom = atom(initialCode);

export const errorsAtom = atom<string[]>([]);

export const packagesAtom = atom((get) => getPackages(get(codeAtom)));
