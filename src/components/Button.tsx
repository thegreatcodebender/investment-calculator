import { PropsWithChildren } from "react";
import { ButtonProps } from "../types/button";

export const Button = ({
  className,
  onClick,
  type,
  btnType,
  children,
  isDisabled,
}: PropsWithChildren<ButtonProps>) => {
  const btnTypeStyles =
    btnType === "primary"
      ? "text-white bg-primary"
      : "border-1 border-primary text-primary not-disabled:hover:bg-primary not-disabled:hover:text-white";
  return (
    <button
      className={`px-4.5 py-4 font-medium rounded-sm leading-none not-disabled:cursor-pointer disabled:cursor-not-allowed not-disabled:hover:bg-accent-purple transition-all ease-in-out ${btnTypeStyles} ${
        className ? className : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
