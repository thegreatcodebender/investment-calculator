import { memo, ReactNode, useEffect, useRef, useState } from "react";

interface AccordionProps {
  title: string;
  content: ReactNode | string;
  id: string;
  isOpen?: boolean;
}
const Accordion = memo(function Accordion({
  title,
  content,
  id,
  isOpen = false,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const resizeTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleButtonClick = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const resizeContentHeight = () => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(isExpanded ? `${scrollHeight}px` : "0px");
      }
    };
    resizeContentHeight();
    const windowResizeContentHeight = () => {
      setHeight("auto");
      if (resizeTimeoutId.current) clearTimeout(resizeTimeoutId.current);
      resizeTimeoutId.current = setTimeout(() => {
        resizeContentHeight();
        resizeTimeoutId.current = null;
      }, 100);
    };
    window.addEventListener("resize", windowResizeContentHeight);
    return () => {
      window.removeEventListener("resize", windowResizeContentHeight);
    };
  }, [isExpanded]);
  return (
    <div className="not-last:mb-4">
      <h3>
        <button
          className={`w-full p-3 border-1 border-gray-300 text-start font-medium bg-white cursor-pointer motion-safe:transition-all ease-cubic-bezier relative ${
            isExpanded ? "rounded-t-md border-b-0" : "rounded-md"
          }`}
          aria-expanded={true}
          aria-controls={`accordion-content-${id}`}
          id={`accordion-button-${id}`}
          onClick={handleButtonClick}
        >
          {title}
          <span
            className={`absolute right-2 top-[50%] translate-y-[-50%] block material-symbols-outlined !text-lg !leading-none motion-safe:transition-transform ease-cubic-bezier origin-[center] w-4.5 h-4.5 ${
              isExpanded ? "-rotate-[90deg]" : "rotate-90"
            }`}
          >
            chevron_right
          </span>
        </button>
      </h3>
      <div
        className={`motion-safe:transition-all ease-cubic-bezier border-gray-300 rounded-b-md overflow-hidden${
          isExpanded ? " border-1" : " border-0"
        }`}
        aria-labelledby={`accordion-button-${id}`}
        aria-hidden={!isExpanded}
        role="region"
        id={`accordion-content-${id}`}
        ref={contentRef}
        style={{ height }}
      >
        <div className="p-3 pb-4 text-gray-600">{content}</div>
      </div>
    </div>
  );
});

export default Accordion;
