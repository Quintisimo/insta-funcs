import { getFuncs } from "~/server/funcs";

export async function getAllFuncs() {
  return getFuncs();
}
