import { atom } from "jotai";

export const codeAtom = atom("");

export const errorsAtom = atom<string[]>([]);

export const packagesAtom = atom((get) =>
  get(codeAtom)
    .split("\n")
    .filter((line) => line.startsWith("import"))
    .map((line) => line.match(/("|')(.*)("|')/)?.[2])
    .filter(Boolean),
);
