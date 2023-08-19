import "./button.css";

type ButtonProps = {
  label: string;
  func: any;
};

export default function Button({ label, func }: ButtonProps) {
  return (
    <button
      className="button"
      onClick={() => {
        func();
      }}
    >
      {label}
    </button>
  );
}
