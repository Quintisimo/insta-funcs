import { Editor as MonacoEditor } from "@monaco-editor/react";
import { setupTypeAcquisition } from "@typescript/ata";
import ts from "typescript";

import { useCode, useError } from "../store/useCode";

export default function Editor() {
  const { code, setCode } = useCode();
  const setErrors = useError((state) => state.setErrors);

  return (
    <div className="h-[600px] w-[90%] m-10 border-2">
      <MonacoEditor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={(value) => setCode(value)}
        value={code}
        onValidate={(markers) => {
          setErrors(markers.map((marker) => marker.message));
        }}
        language="typescript"
        defaultPath="index.ts"
        path="index.ts"
        onMount={(editor, monaco) => {
          const tsDefault = monaco?.languages.typescript.typescriptDefaults;

          tsDefault.setCompilerOptions({
            esModuleInterop: true,
          });

          const ata = setupTypeAcquisition({
            projectName: "ts",
            typescript: ts,
            delegate: {
              receivedFile: (code, _path) => {
                const path = "file://" + _path;
                tsDefault.addExtraLib(code, path);
              },
            },
          });

          editor.onDidChangeModelContent(() => ata(editor.getValue()));
          // ata(editor.getValue());
        }}
      />
    </div>
  );
}
