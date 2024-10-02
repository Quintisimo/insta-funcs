import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { setupTypeAcquisition } from "@typescript/ata";
import { useAtom, useSetAtom } from "jotai";
import ts from "typescript";
import { codeAtom, errorsAtom } from "~/store";
import { handlerArgsStr } from "~/utils/types";

const useStyles = makeStyles({
  wrapper: {
    height: "600px",
    width: "100%",
    ...shorthands.margin(tokens.spacingVerticalL, 0),
  },
  // Mimic fluent ui input styles
  editor: {
    position: "relative",
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    ...shorthands.border(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorNeutralStroke1,
    ),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    ":focus-within": {
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },
    "::after": {
      content: '""',
      position: "absolute",
      ...shorthands.inset("auto", "-1px", "-1px", "-1px"),
      height: `max(2px, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,
      ...shorthands.borderBottom(
        "2px",
        "solid",
        tokens.colorCompoundBrandStroke,
      ),
      clipPath: "inset(calc(100% - 2px) 0px 0px)",
      transform: "scaleX(0)",
      transitionProperty: "transform",
      transitionDuration: tokens.durationUltraFast,
      transitionDelay: tokens.curveAccelerateMid,
    },
    ":focus-within::after": {
      transform: "scaleX(1)",
      transitionProperty: "transform",
      transitionDuration: tokens.durationNormal,
      transitionDelay: tokens.curveDecelerateMid,
    },
  },
});

export default function Editor() {
  const classes = useStyles();
  const [code, setCode] = useAtom(codeAtom);
  const setErrors = useSetAtom(errorsAtom);

  return (
    <div className={classes.wrapper}>
      <MonacoEditor
        className={classes.editor}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        defaultValue={code}
        onChange={(value) => setCode(value)}
        onValidate={(markers) => {
          setErrors(
            markers
              // Only include error, exclude warnings:https://microsoft.github.io/monaco-editor/docs.html#enums/MarkerSeverity.html
              .filter((marker) => marker.severity === 8)
              .map((marker) => marker.message),
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
