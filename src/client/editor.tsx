import { Editor as MonacoEditor } from "@monaco-editor/react";
import { setupTypeAcquisition } from "@typescript/ata";
import { useAtom, useSetAtom } from "jotai";
import ts from "typescript";
import { codeAtom, errorsAtom, methodAtom, nameAtom } from "./store";
import { handlerArgsStr } from "./utils/types";
import { getContainerFiles } from "./webcontainer";
import { WebContainer } from "@webcontainer/api";
import { useState } from "react";

export default function Editor() {
  const [code, setCode] = useAtom(codeAtom);
  const setErrors = useSetAtom(errorsAtom);
  const [name, setName] = useAtom(nameAtom);
  const [method, setMethod] = useAtom(methodAtom);

  const [building, setBuilding] = useState(false);

  async function buildCode() {
    try {
      if (!name) return alert("Please enter a function name.");

      setBuilding(true);
      const webcontainerInstance = await WebContainer.boot();
      await webcontainerInstance.mount(getContainerFiles(name, code));

      const installProcess = await webcontainerInstance.spawn("npm", [
        "install",
      ]);
      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0)
        throw new Error("Failed to install dependencies.");

      const buildProcess = await webcontainerInstance.spawn("npm", [
        "run",
        "build",
      ]);
      const buildExitCode = await buildProcess.exit;
      console.log("Build exit code:", buildExitCode);

      if (buildExitCode !== 0) throw new Error("Build failed.");

      const builtFile = await webcontainerInstance.fs.readFile(
        "/function.js",
        "utf-8"
      );
      console.log("Built file content:", builtFile);
    } catch (error) {
      console.error("Error during build process:", error);
    } finally {
      setBuilding(false);
    }
  }

  return (
    <div className="h-[85vh] w-[90%] mx-auto mt-10">
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
          onClick={buildCode}
          disabled={building}
        >
          {building ? (
            <>
              <span className="loading loading-spinner"></span> Building
            </>
          ) : (
            "Build"
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
