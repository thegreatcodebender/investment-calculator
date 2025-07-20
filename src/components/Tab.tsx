import { PropsWithChildren } from "react";
import { TabProps } from "../types/tab";

const Tab = ({
  children,
  onClick,
  isActive,
  ariaControls,
  refFn,
}: PropsWithChildren<TabProps>) => {
  return (
    <button
      className={`px-2 sm:px-4 py-2 sm:py-3 border-b-4 cursor-pointer text-nowrap motion-safe:transition-all hover:text-primary ${
        isActive
          ? "border-b-primary text-primary motion-safe:animate-tab-active"
          : "border-b-transparent"
      }`}
      type="button"
      onClick={onClick}
      ref={refFn}
      role="tab"
      aria-selected={isActive}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  );
};

export default Tab;
