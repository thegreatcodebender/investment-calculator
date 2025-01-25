import { PropsWithChildren } from "react";
interface Tab {
  children: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Tab = ({ children, onClick, isActive }: PropsWithChildren<Tab>) => {
  return (
    <button
      className={`px-4 py-3 border-b-4 cursor-pointer ${
        isActive ? "border-b-primary text-primary" : "border-b-transparent"
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Tab;
