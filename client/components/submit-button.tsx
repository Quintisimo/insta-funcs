import { Button } from "@fluentui/react-components";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { codeAtom, errorsAtom, methodAtom, nameAtom } from "~/store";

export default function SubmitButton() {
  const location = useLocation();
  const code = useAtomValue(codeAtom);
  const errors = useAtomValue(errorsAtom);
  const name = useAtomValue(nameAtom);
  const method = useAtomValue(methodAtom);

  const text = useMemo(() => {
    const { pathname } = location;

    if (pathname === "/new") {
      return "Create";
    }
    return "Update";
  }, [location]);

  return (
    <Button
      type="submit"
      disabled={
        !code.length || !!errors.length || !name.length || !method.length
      }
    >
      {text}
    </Button>
  );
}
