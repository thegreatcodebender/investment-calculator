import { PropsWithChildren, useEffect, useRef } from "react";
import { ButtonProps } from "../types/button";

export const Button = ({
  className,
  onClick,
  type,
  btnType,
  children,
  isDisabled,
  isFixedWidth = false,
}: PropsWithChildren<ButtonProps>) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const btnTypeStyles =
    btnType === "primary"
      ? "text-white bg-primary"
      : "border-1 border-primary text-primary not-disabled:hover:bg-primary not-disabled:hover:text-white";

  // To fix the width of buttons fixed to change texts without layout shift
  useEffect(() => {
    if (isFixedWidth) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear timeout if any
      timeoutRef.current = setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.width =
            Math.ceil(buttonRef.current.scrollWidth + 1) + "px";
        }
        timeoutRef.current = null;
      }, 0);
    }
  }, [isFixedWidth]);

  return (
    <button
      className={`px-4.5 py-4 font-medium rounded-sm leading-none disabled:bg-gray-500 not-disabled:cursor-pointer disabled:cursor-not-allowed not-disabled:hover:bg-accent-purple transition-all ease-in-out ${btnTypeStyles} ${
        className ? className : ""
      }`}
      ref={buttonRef}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
