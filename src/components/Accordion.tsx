import { memo, ReactNode, useState } from "react";

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

  const handleButtonClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="not-last:mb-4">
      <h3>
        <button
          className={`w-full p-3 border-1 border-gray-300 text-start font-medium bg-gray-50 cursor-pointer motion-safe:transition-all ease-cubic-bezier relative ${
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
        className={`motion-safe:transition-all ease-cubic-bezier border-1 duration-300 border-gray-300 rounded-b-md overflow-hidden${
          isExpanded ? " max-h-96 border-t-transparent" : " max-h-0 opacity-0"
        }`}
        aria-labelledby={`accordion-button-${id}`}
        aria-hidden={!isExpanded}
        role="region"
        id={`accordion-content-${id}`}
      >
        <div className="p-3 pb-4 text-gray-600">{content}</div>
      </div>
    </div>
  );
});

export default Accordion;
