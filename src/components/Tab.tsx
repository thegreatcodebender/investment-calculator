import { PropsWithChildren } from "react";
import { TabProps } from "../types/tab";

const Tab = ({
  children,
  onClick,
  isActive,
  refFn,
}: PropsWithChildren<TabProps>) => {
  return (
    <button
      className={`px-2 sm:px-4 py-2 sm:py-3 border-b-4 cursor-pointer text-nowrap ${
        isActive
          ? "border-b-primary text-primary animate-tab-active"
          : "border-b-transparent"
      }`}
      type="button"
      onClick={onClick}
      ref={refFn}
    >
      {children}
    </button>
  );
};

export default Tab;
