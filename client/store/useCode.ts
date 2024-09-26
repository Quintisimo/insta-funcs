import { create } from "zustand";

interface Code {
  code: string;
  packages: string[];
  loading: boolean;
  setCode: (code: string) => void;
}

interface Error {
  errors: string[];
  setErrors: (error: string[]) => void;
}

function getNpmPackages(code: string) {
  return code
    .split("\n")
    .filter((line) => line.startsWith("import"))
    .map((line) => line.match(/("|')(.*)("|')/)?.[2])
    .filter(Boolean);
}

export const useCode = create<Code>()((set) => ({
  code: "",
  packages: [],
  loading: false,
  setCode: (code) =>
    set({
      code,
      packages: getNpmPackages(code),
    }),
}));

export const useError = create<Error>()((set) => ({
  errors: [],
  setErrors: (errors) => set({ errors }),
}));
