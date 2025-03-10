import Tab from "./Tab";
import { INVESTMENT_MODES } from "../constants/investment";
import useIsMobile from "../hooks/useIsMobile";
import { useState } from "react";
import { TabGroupProps } from "../types/tabGroup";

const TabGroup = ({ data, activeTab, onClick }: TabGroupProps) => {
  const [isScrollIntoViewActive, setIsScrollIntoViewActive] = useState(false); // To prevent scrollIntoView from firing on page load
  const isMobile = useIsMobile();
  let timeoutId: number | null = null;
  /**
   * Invoke onClick function and activate `initialAction` state to enable `scrollIntoView`
   * @param {typeof INVESTMENT_MODES[0]} modeObj - Title, Default Amount, Short name
   */
  const handleClick = (modeObj: (typeof INVESTMENT_MODES)[0]) => {
    setIsScrollIntoViewActive(true); // Activate to enable the scrollIntoView in mobile
    onClick(modeObj);
    // Prevent scrolling on rerenders
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsScrollIntoViewActive(false);
    }, 100);
  };
  return (
    <nav
      className="flex text-base font-medium overflow-x-auto no-scrollbar"
      aria-label="I know my"
    >
      {data.map((modeObj) => (
        <Tab
          isActive={activeTab === modeObj.title}
          key={modeObj.title}
          onClick={() => handleClick(modeObj)}
          refFn={(node: HTMLButtonElement) => {
            if (
              activeTab === modeObj.title &&
              node &&
              isMobile &&
              isScrollIntoViewActive
            ) {
              node.scrollIntoView({ behavior: "auto", inline: "start" });
            }
          }}
        >
          {modeObj.title}
        </Tab>
      ))}
    </nav>
  );
};

export default TabGroup;
