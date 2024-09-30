import { Form } from "react-router-dom";
import Button from "../components/button";
import Editor from "../components/editor";
import FuncProps from "../components/func-props";

function FuncForm() {
  return (
    <Form
      className="p-10 w-[90%] mx-auto flex flex-col items-center justify-center"
      method="post"
    >
      <FuncProps />
      <Editor />
      <Button />
    </Form>
  );
}

export default FuncForm;
