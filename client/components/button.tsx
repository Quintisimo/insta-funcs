import { useAtomValue } from "jotai";
import { codeAtom, errorsAtom, packagesAtom } from "../store";

export default function Button() {
  const code = useAtomValue(codeAtom);
  const packages = useAtomValue(packagesAtom);
  const errors = useAtomValue(errorsAtom);

  return (
    <button
      className="bg-teal-200 p-2 rounded-md disabled:bg-gray-100"
      disabled={!code.length || !!errors.length}
      onClick={() => {
        console.log({
          code,
          packages,
        });
      }}
    >
      Submit
    </button>
  );
}
