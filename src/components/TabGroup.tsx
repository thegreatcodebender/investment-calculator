import Tab from "./Tab";
import { INVESTMENT_MODES } from "../constants/investment";

interface TabGroupProps {
  data: typeof INVESTMENT_MODES;
  activeTab: string;
  onClick: ({
    title,
    defaultAmount,
  }: {
    title: string;
    defaultAmount: number;
  }) => void;
}

export type TabMap = Map<string, HTMLElement>;

const TabGroup = ({ data, activeTab, onClick }: TabGroupProps) => {
  return (
    <nav
      className="flex text-base font-medium overflow-x-auto no-scrollbar"
      aria-label="I know my"
    >
      {data.map(({ title, defaultAmount }) => (
        <Tab
          isActive={activeTab === title}
          key={title}
          onClick={() => onClick({ title, defaultAmount })}
          refFn={(node: HTMLButtonElement) => {
            if (activeTab === title && node) {
              node.scrollIntoView({ behavior: "smooth", inline: "start" });
            }
          }}
        >
          {title}
        </Tab>
      ))}
    </nav>
  );
};

export default TabGroup;
