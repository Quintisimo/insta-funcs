import { Form } from "react-router-dom";
import Button from "../components/button";
import Editor from "../components/editor";

function FuncForm() {
  return (
    <Form className="flex flex-col items-center justify-center" method="post">
      <Editor />
      <Button />
    </Form>
  );
}

export default FuncForm;
