export interface ButtonProps {
  className?: string;
  onClick?: (args: unknown) => void;
  type?: "button" | "submit";
  btnType: "primary" | "secondary";
  isDisabled?: boolean;
}
