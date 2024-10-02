import { makeStyles, tokens } from "@fluentui/react-components";
import { Form } from "react-router-dom";
import Editor from "~/components/editor";
import FuncProps from "~/components/func-props";
import SubmitButton from "~/components/submit-button";

const useStyles = makeStyles({
  form: {
    padding: tokens.spacingVerticalL,
    width: "90%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

function FuncForm() {
  const classes = useStyles();

  return (
    <Form className={classes.form} method="post">
      <FuncProps />
      <Editor />
      <SubmitButton />
    </Form>
  );
}

export default FuncForm;
