import { ActionFunctionArgs, redirect } from "react-router-dom";
import { addFunc, removeOldFunc } from "../../../server/funcs";
import { getFuncNameandMethod } from "../../../utils/code";
import { getDefaultStore } from "jotai";
import { codeAtom, methodAtom, nameAtom } from "../../store";

export async function createFunc() {
  const store = getDefaultStore();
  const code = store.get(codeAtom);
  const name = store.get(nameAtom);
  const method = store.get(methodAtom);
  await addFunc(code, name, method);
  return redirect("/");
}

export async function updateFunc({ params }: ActionFunctionArgs) {
  const { name, method } = getFuncNameandMethod(params);
  await removeOldFunc(name, method);
  return createFunc();
}
