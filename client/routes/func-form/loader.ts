import { getDefaultStore } from "jotai";
import type { LoaderFunctionArgs } from "react-router-dom";
import { getFuncContent } from "~/server/funcs";
import { codeAtom, initialCode, methodAtom, nameAtom } from "~/store";
import { getFuncNameandMethod } from "~/utils/code";

function setStore(name: string, method: string, content: string) {
  const store = getDefaultStore();
  store.set(codeAtom, content);
  store.set(nameAtom, name);
  store.set(methodAtom, method);
}

export function newFunc() {
  setStore("", "", initialCode);
  return null;
}

export async function getFunc({ params }: LoaderFunctionArgs) {
  const { name, method } = getFuncNameandMethod(params);
  const content = await getFuncContent(name, method);
  setStore(name, method, content);
  return null;
}
