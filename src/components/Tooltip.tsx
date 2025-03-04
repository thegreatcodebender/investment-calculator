import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { TooltipProps } from "../types/tooltip";

const Tooltip = ({ tooltipContent, iconClassName }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipIdRandom = Math.round(Math.random() * 150);
  const tooltipBodyWidth = 250;

  /** Show tooltip by setting the state to true */
  const showTooltip = () => setIsVisible(true);
  /** Hide tooltip by setting the state to false */
  const hideTooltip = () => setIsVisible(false);
  /** Place tooltip at required position */
  const placeTooltip = () => {
    if (isVisible && triggerRef.current) {
      const { bottom, left, width } =
        triggerRef.current.getBoundingClientRect();
      const tooltipRightEdge = left + width + tooltipBodyWidth / 2;
      const isOverFlowing = tooltipRightEdge > window.innerWidth;
      setPosition({
        top: bottom + window.scrollY - 4,
        left: isOverFlowing
          ? left - tooltipBodyWidth / 4
          : left + width / 2 + window.scrollX,
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
        type="button"
      >
        <span className="material-symbols-outlined !text-[18px]">info</span>
      </button>

      {isVisible &&
        createPortal(
          <div
            className="motion-safe:animate-fade-in-fast absolute z-999 p-2.5 sm:p-3 text-xs text-gray-800 max-sm:min-w-[250px] max-w-60 bg-white rounded shadow-card border border-gray-200"
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
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
