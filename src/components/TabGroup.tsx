import Tab from "./Tab";
import { INVESTMENT_MODES } from "../constants/investment";
import useIsMobile from "../hooks/useIsMobile";
import { useState } from "react";

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
  const [isInitialAction, setIsInitialAction] = useState(true); // To prevent scrollIntoView from firing on page load
  const isMobile = useIsMobile();

  /**
   * Invoke onClick function and activate `initialAction` state to enable `scrollIntoView`
   * @param {object} investmentModeParams - Title, Default Amount
   */
  const handleClick = ({
    title,
    defaultAmount,
  }: {
    title: string;
    defaultAmount: number;
  }) => {
    setIsInitialAction(false); // Activate to enable the scrollIntoView in mobile
    onClick({ title, defaultAmount });
  };
  return (
    <nav
      className="flex text-base font-medium overflow-x-auto no-scrollbar"
      aria-label="I know my"
    >
      {data.map(({ title, defaultAmount }) => (
        <Tab
          isActive={activeTab === title}
          key={title}
          onClick={() => handleClick({ title, defaultAmount })}
          refFn={(node: HTMLButtonElement) => {
            if (activeTab === title && node && isMobile && !isInitialAction) {
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
