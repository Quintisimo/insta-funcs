import { Editor as MonacoEditor } from "@monaco-editor/react";
import { setupTypeAcquisition } from "@typescript/ata";
import { useAtom, useSetAtom } from "jotai";
import ts from "typescript";
import { codeAtom, errorsAtom } from "./store";
import { handlerArgsStr } from "./utils/types";

export default function Editor() {
  const [code, setCode] = useAtom(codeAtom);
  const setErrors = useSetAtom(errorsAtom);

  return (
    <div className="h-[85vh] w-[90%] mx-auto mt-10">
      <div className="my-2 flex justify-between">
        <input type="text" placeholder="Function Name" className="input" />
        <select defaultValue="HTTP Method" className="select">
          <option disabled={true}>HTTP Method</option>
          <option>GET</option>
          <option>POST</option>
        </select>
      </div>
      <MonacoEditor
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        defaultValue={code}
        onChange={(value) => {
          if (value) setCode(value);
        }}
        onValidate={(markers) => {
          setErrors(
            markers
              // Only include error, exclude warnings:https://microsoft.github.io/monaco-editor/docs.html#enums/MarkerSeverity.html
              .filter((marker) => marker.severity === 8)
              .map((marker) => marker.message)
          );
        }}
        language="typescript"
        defaultPath="index.ts"
        path="index.ts"
        onMount={(editor, monaco) => {
          const tsDefault = monaco?.languages.typescript.javascriptDefaults;
          const name = "ts:filename/argType.d.ts";
          const uri = monaco.Uri.parse(name);
          const model = monaco.editor.getModel(uri);

          if (!model) {
            const content = handlerArgsStr;
            tsDefault.addExtraLib(content, name);
            monaco.editor.createModel(content, "typescript", uri);
          }

          tsDefault.setCompilerOptions({
            esModuleInterop: true,
          });

          const ata = setupTypeAcquisition({
            projectName: "ts",
            typescript: ts,
            delegate: {
              receivedFile: (code, _path) => {
                const path = `file://${_path}`;
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
