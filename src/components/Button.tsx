import { PropsWithChildren } from "react";
import { ButtonProps } from "../types/button";

export const Button = ({
  className,
  onClick,
  type,
  btnType,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const btnTypeStyles =
    btnType === "primary"
      ? "text-white bg-primary"
      : "border-1 border-primary text-primary hover:bg-primary hover:text-white";
  return (
    <button
      className={`px-4.5 py-4 font-medium rounded-sm leading-none not-disabled:cursor-pointer hover:bg-accent-purple transition-all ease-in-out ${btnTypeStyles} ${
        className ? className : ""
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
