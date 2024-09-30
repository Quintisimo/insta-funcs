import { Editor as MonacoEditor } from "@monaco-editor/react";
import { setupTypeAcquisition } from "@typescript/ata";
import ts from "typescript";
import { useAtom, useSetAtom } from "jotai";

import { codeAtom, errorsAtom } from "../store";
import { getHandlerArgsTypeStr } from "../../utils/code";

export default function Editor() {
  const [code, setCode] = useAtom(codeAtom);
  const setErrors = useSetAtom(errorsAtom);

  return (
    <div className="h-[600px] w-[90%] m-10 border-2">
      <input type="hidden" name="code" value={code} />
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
          const tsDefault = monaco?.languages.typescript.javascriptDefaults;

          const content = getHandlerArgsTypeStr();
          const name = "ts:filename/argType.d.ts";
          tsDefault.addExtraLib(content, name);
          monaco.editor.createModel(
            content,
            "typescript",
            monaco.Uri.parse(name),
          );

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
        }}
      />
    </div>
  );
}
