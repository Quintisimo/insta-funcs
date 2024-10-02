import { Form } from "react-router-dom";
import Editor from "~/components/editor";
import FuncProps from "~/components/func-props";
import SubmitButton from "~/components/submit-button";

function FuncForm() {
  return (
    <Form
      className="p-10 w-[90%] mx-auto flex flex-col items-center justify-center"
      method="post"
    >
      <FuncProps />
      <Editor />
      <SubmitButton />
    </Form>
  );
}

export default FuncForm;
