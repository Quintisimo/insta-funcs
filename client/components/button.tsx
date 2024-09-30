import { useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { codeAtom, errorsAtom } from "../store";
import { useMemo } from "react";

export default function Button() {
  const location = useLocation();
  const code = useAtomValue(codeAtom);
  const errors = useAtomValue(errorsAtom);

  const text = useMemo(() => {
    const { pathname } = location;

    if (pathname === "/new") {
      return "Create";
    }
    return "Update";
  }, [location]);

  return (
    <button
      type="submit"
      className="bg-teal-200 p-2 rounded-md disabled:bg-gray-100"
      disabled={!code.length || !!errors.length}
    >
      {text}
    </button>
  );
}
