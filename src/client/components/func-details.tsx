import { useAtom, useAtomValue } from "jotai";
import { nameAtom, methodAtom, savingAtom, codeAtom } from "../store";
import { saveCode } from "../webcontainer";

export default function FuncDetails() {
  const [name, setName] = useAtom(nameAtom);
  const [method, setMethod] = useAtom(methodAtom);
  const [saving, setSaving] = useAtom(savingAtom);
  const code = useAtomValue(codeAtom);

  return (
    <div className="my-2 flex justify-between">
      <input
        type="text"
        placeholder="Function Name"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={async () => {
          try {
            setSaving(true);
            await saveCode(name, code, method);
          } catch (error) {
            console.error("Error saving code:", error);
          } finally {
            setSaving(false);
          }
        }}
        disabled={saving}
      >
        {saving ? (
          <>
            <span className="loading loading-spinner"></span> Saving
          </>
        ) : (
          "Save"
        )}
      </button>
      <select
        defaultValue="HTTP Method"
        className="select"
        value={method}
        onChange={(e) => setMethod(e.target.value as "GET" | "POST")}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </div>
  );
}
