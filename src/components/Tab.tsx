import { PropsWithChildren } from "react";
interface TabProps {
  children: string;
  isActive?: boolean;
  onClick?: () => void;
  refFn: (node: HTMLButtonElement) => void;
}

const Tab = ({
  children,
  onClick,
  isActive,
  refFn,
}: PropsWithChildren<TabProps>) => {
  return (
    <button
      className={`px-4 py-3 border-b-4 cursor-pointer text-nowrap ${
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
