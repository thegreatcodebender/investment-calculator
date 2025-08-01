import Tab from "./Tab";
import { INVESTMENT_MODES } from "../constants/investment";
import useIsMobile from "../hooks/useIsMobile";
import { useState } from "react";
import { TabGroupProps } from "../types/tabGroup";
import useDebounce from "../hooks/useDebounce";

const TabGroup = ({
  data,
  activeTab,
  ariaControls,
  onClick,
}: TabGroupProps) => {
  const [isScrollIntoViewActive, setIsScrollIntoViewActive] = useState(false); // To prevent scrollIntoView from firing on page load
  const isMobile = useIsMobile();
  /** Disable scroll to view in re-renders */
  const disableScrollTabToView = useDebounce(
    () => setIsScrollIntoViewActive(false),
    100
  );
  /**
   * Invoke `onClick` function and activate `initialAction` state to enable `scrollIntoView`
   * @param {typeof INVESTMENT_MODES[0]} modeObj - Title, Default Amount, Short name
   */
  const handleClick = (modeObj: (typeof INVESTMENT_MODES)[0]) => {
    setIsScrollIntoViewActive(true); // Activate to enable the scrollIntoView in mobile
    onClick(modeObj);
    disableScrollTabToView();
  };
  return (
    <ul
      className="flex text-base font-medium overflow-x-auto no-scrollbar"
      aria-label="I know my"
      role="tablist"
    >
      {data.map((modeObj) => (
        <li key={modeObj.title} role="presentation">
          <Tab
            isActive={activeTab === modeObj.title}
            onClick={() => handleClick(modeObj)}
            ariaControls={ariaControls}
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
        </li>
      ))}
    </ul>
  );
};

export default TabGroup;
