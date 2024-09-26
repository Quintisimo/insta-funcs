import { useCode, useError } from "../store/useCode";

export default function Button() {
  const { code, packages } = useCode();
  const errors = useError((state) => state.errors);

  return (
    <button
      className="bg-teal-200 p-2 rounded-md disabled:bg-gray-100"
      disabled={!code.length || !!errors.length}
      onClick={() => {
        console.log({
          code,
          packages,
        });
      }}
    >
      Submit
    </button>
  );
}
