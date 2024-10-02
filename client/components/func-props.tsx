import {
  Dropdown,
  Input,
  Label,
  Option,
  Tooltip,
  tokens,
  useId,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { httpMethods, methodAtom, nameAtom } from "~/store";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: " 100%",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
});

function InputWrapper({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  return <div className={classes.inputWrapper}>{children}</div>;
}

export default function FuncProps() {
  const classes = useStyles();
  const [name, setName] = useAtom(nameAtom);
  const [method, setMethod] = useAtom(methodAtom);

  const inputId = useId("input");
  const dropdownId = useId("dropdown");

  return (
    <div className={classes.container}>
      <InputWrapper>
        <Label htmlFor={inputId} required>
          Name
        </Label>
        <Tooltip content="Should be lowercase" relationship="label">
          <Input
            id={inputId}
            required
            name="name"
            defaultValue={name}
            onChange={(evt, data) => {
              if (/^[a-z]+$/.test(data.value)) {
                setName(data.value);
                return;
              }
              setName("");
            }}
          />
        </Tooltip>
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor={dropdownId} required>
          Method
        </Label>
        <Dropdown
          id={dropdownId}
          name="method"
          aria-required
          defaultValue={method}
          onOptionSelect={(evt, data) => setMethod(data.optionValue)}
        >
          {httpMethods.map((method) => (
            <Option key={method} value={method}>
              {method}
            </Option>
          ))}
        </Dropdown>
      </InputWrapper>
    </div>
  );
}
