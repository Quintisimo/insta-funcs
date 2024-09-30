import { useAtom } from "jotai";
import { HttpMethods, httpMethods, methodAtom, nameAtom } from "../store";

function FuncProps() {
  const [name, setName] = useAtom(nameAtom);
  const [method, setMethod] = useAtom(methodAtom);

  return (
    <div className="flex w-full justify-between">
      <input
        type="text"
        name="name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        className="border-2"
      />

      <select
        name="method"
        value={method}
        onChange={(evt) => setMethod(evt.target.value as HttpMethods)}
      >
        {httpMethods.map((method) => (
          <option key={method} value={method}>
            {method.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FuncProps;
