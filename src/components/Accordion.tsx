import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import { AccordionProps } from "../types/accordion";
import useDebounce from "../hooks/useDebounce";

const Accordion = memo(function Accordion({
  title,
  content,
  isOpen = false,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const hideAccordion = useDebounce(() => {
    // When accordion is expanded and height set is to 0
    if (contentContainerRef.current && isExpanded) {
      contentContainerRef.current.style.display = "none";
      contentContainerRef.current.style.height = "auto";
    }
  }, 500);

  const animateExpansion = useDebounce(() => {
    // When accordion is collapsed and height is set to 0
    if (contentContainerRef.current && !isExpanded) {
      contentContainerRef.current.style.height =
        contentContainerRef.current.scrollHeight + "px";
      setIsExpanded(true);
    }
  }, 100);

  /**
   * Accordion expand animation on accordion trigger button click
   */
  const handleButtonClick = () => {
    // When accordion is collapsed and height is set to auto
    if (contentContainerRef.current && !isExpanded) {
      contentContainerRef.current.style.display = "block"; // Unhide element
      contentContainerRef.current.style.height = "0px"; // Make height 0 for animation's initial state
    }
    // When accordion is expanded and height set is to auto
    if (contentContainerRef.current && isExpanded) {
      contentContainerRef.current.style.height = "0px"; // Make height 0 for animation's end state
      setIsExpanded(false);
    }

    // To hide the accordion
    hideAccordion();

    // Change after a delay to animate expansion
    animateExpansion();
  };

  const resizeOnWindowResize = useDebounce(() => {
    // Check if node exists and it is visible
    if (contentContainerRef.current) {
      if (contentContainerRef.current.style.display !== "none") {
        // Assign the new natural height of element as height property
        contentContainerRef.current.style.height =
          contentContainerRef.current.scrollHeight + "px";
      }
    }
  }, 100);

  /**
   * Recalculate and adjust accordion content height
   */
  const adjustExpandedAccHeight = useCallback(() => {
    if (contentContainerRef.current) {
      // Check if the content is expanded
      if (contentContainerRef.current.style.display !== "none") {
        contentContainerRef.current.style.height = "auto"; // Set height to auto to make the content to be in its natural height
        resizeOnWindowResize();
      }
    }
  }, []);

  // Adjust content height on window resize
  useEffect(() => {
    window.addEventListener("resize", adjustExpandedAccHeight);
    return () => window.removeEventListener("resize", adjustExpandedAccHeight);
  }, []);

  return (
    <div className="not-last:mb-4">
      <h3>
        <button
          className={`w-full p-3 pe-7 border-1 border-gray-300 text-start font-medium bg-gray-50 cursor-pointer motion-safe:transition-all ease-cubic-bezier relative ${
            isExpanded ? "rounded-t-md  border-b-transparent" : " rounded-md"
          }`}
          aria-expanded={true}
          aria-controls={`accordion-content-${id}`}
          id={`accordion-button-${id}`}
          onClick={handleButtonClick}
        >
          {title}
          <span
            className={`absolute right-2 top-[50%] translate-y-[-50%] block material-symbols-outlined !text-lg !leading-none motion-safe:transition-transform ease-cubic-bezier duration-500 origin-[center] w-4.5 h-4.5 ${
              isExpanded ? "-rotate-[90deg]" : "rotate-90"
            }`}
          >
            chevron_right
          </span>
        </button>
      </h3>
      <div
        className={`motion-safe:transition-all ease-cubic-bezier duration-500 border-gray-300 rounded-b-md overflow-hidden${
          isExpanded ? " border-1 border-t-0" : " opacity-0"
        }`}
        aria-labelledby={`accordion-button-${id}`}
        aria-hidden={!isExpanded}
        role="region"
        id={`accordion-content-${id}`}
        ref={contentContainerRef}
        style={{ display: "none" }}
      >
        <div className="p-3 pb-4 text-gray-600">{content}</div>
      </div>
    </div>
  );
});

export default Accordion;
