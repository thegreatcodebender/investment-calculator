import { useState, useEffect } from "react";
import { ToastProps } from "../types/toast";
import useIsMobile from "../hooks/useIsMobile";

interface PositionClasses {
  [key: string]: string;
}

const Toast: React.FC<ToastProps> = ({
  position = "bottom-offset",
  text,
  onHide,
}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const isMobile = useIsMobile();

  const positionClasses: PositionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-offset": "bottom-22 left-1/2 -translate-x-1/2",
  };

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      onHide && onHide();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onHide]);

  return (
    <div
      className={`fixed z-50 transition-opacity duration-500 select-none
    ${fadeOut ? "opacity-0" : "opacity-100"}
    ${isMobile ? positionClasses["bottom-offset"] : positionClasses[position]}`}
    >
      <div
        className="flex items-center justify-center gap-1 bg-white text-gray-800 border
       border-gray-200 px-3 py-2 text-sm rounded-lg shadow-xl"
        aria-live="polite"
      >
        <span className="material-symbols-outlined tex-sm" aria-hidden>
          check_circle
        </span>{" "}
        {text}
      </div>
    </div>
  );
};

export default Toast;
