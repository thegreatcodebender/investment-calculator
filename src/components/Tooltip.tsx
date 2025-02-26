import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { TooltipProps } from "../types/tooltip";

const Tooltip = ({ tooltipContent, iconClassName }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipIdRandom = Math.round(Math.random() * 150);

  /** Show tooltip by setting the state to true */
  const showTooltip = () => setIsVisible(true);
  /** Hide tooltip by setting the state to false */
  const hideTooltip = () => setIsVisible(false);
  /** Place tooltip at required position */
  const placeTooltip = () => {
    if (isVisible && triggerRef.current) {
      const { bottom, left, width } =
        triggerRef.current.getBoundingClientRect();
      setPosition({
        top: bottom + window.scrollY,
        left: left + width / 2 + window.scrollX,
      });
    }
  };

  useEffect(() => {
    placeTooltip();
    window.addEventListener("resize", placeTooltip);
    return () => window.addEventListener("resize", placeTooltip);
  }, [isVisible]);

  return (
    <>
      <button
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onClick={showTooltip}
        className={`flex p-1 max-sm:p-2.25 sm:ms-1 leading-none text-gray-600 cursor-pointer${
          iconClassName ? ` ${iconClassName}` : ""
        }`}
        aria-describedby={`tooltip-${tooltipIdRandom}`}
      >
        <span className="material-symbols-outlined !text-[18px]">info</span>
      </button>

      {isVisible &&
        createPortal(
          <div
            className="absolute z-999 p-2 text-xs text-gray-800 min-w-[150px] max-w-60 bg-white rounded shadow-card border border-gray-200"
            role="tooltip"
            id={`tooltip-${tooltipIdRandom}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translateX(-50%)",
            }}
          >
            {tooltipContent}
            <div
              className="absolute w-3 h-3 bg-gray-100 shadow-lg border border-gray-200 [clip-path:polygon(50%_50%,100%_100%,0%_100%)]"
              style={{
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            ></div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
