import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { ButtonProps } from "../types/button";
import useIsMobile from "../hooks/useIsMobile";

export const Button = ({
  className,
  onClick,
  type = "button",
  btnType,
  children,
  isDisabled,
  isFixedWidth = false,
}: PropsWithChildren<ButtonProps>) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const isWidthUpdated = useRef(false);
  const btnTypeStyles =
    btnType === "primary"
      ? "text-white bg-primary"
      : "border-1 border-primary text-primary not-disabled:hover:bg-primary not-disabled:hover:text-white";

  /**
   * Fix button height if `isFixedHeight` is true
   */
  const fixBtnHeight = useCallback(() => {
    if (buttonRef.current && isFixedWidth && !isWidthUpdated.current) {
      const borderWidth =
        parseInt(buttonRef.current.style.borderWidth.split("px")[0]) * 2;
      buttonRef.current.style.width =
        (
          buttonRef.current.scrollWidth +
          (isNaN(borderWidth) ? 0.5 : borderWidth)
        ).toFixed(2) + "px";
      isWidthUpdated.current = true;
    }
  }, [isWidthUpdated.current, isMobile]);

  // To fix the width of buttons fixed to change texts without layout shift
  useEffect(() => {
    buttonRef.current?.addEventListener("focus", fixBtnHeight);
    buttonRef.current?.addEventListener("mouseover", fixBtnHeight);
    return () => {
      buttonRef.current?.removeEventListener("focus", fixBtnHeight);
      buttonRef.current?.removeEventListener("mouseover", fixBtnHeight);
    };
  }, [isFixedWidth, children, isMobile]);

  // To handle width change when screen width changes
  useEffect(() => {
    isWidthUpdated.current = false;
  }, [isMobile]);

  return (
    <button
      className={`px-4.5 py-4 font-medium rounded-sm leading-none disabled:bg-gray-500 
        not-disabled:cursor-pointer disabled:cursor-not-allowed not-disabled:hover:bg-accent-purple transition-all ease-in-out 
        ${btnTypeStyles} ${className ? className : ""}`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      <div ref={buttonRef} className="mx-auto">
        {children}
      </div>
    </button>
  );
};
