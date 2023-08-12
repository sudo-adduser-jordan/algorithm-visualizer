import "./button.css";

type ButtonProps = {
  label: string;
  method: string;
  sort: (method: string) => void;
};

export default function Button({ label, method, sort }: ButtonProps) {
  return (
    <button
      className="button"
      onClick={() => {
        sort(method);
      }}
    >
      {label}
    </button>
  );
}
