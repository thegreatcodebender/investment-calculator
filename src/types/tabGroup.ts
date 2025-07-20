import { INVESTMENT_MODES } from "../constants/investment";

export interface TabGroupProps {
  data: typeof INVESTMENT_MODES;
  activeTab: string;
  onClick: (modeObj: (typeof INVESTMENT_MODES)[0]) => void;
  ariaControls: string;
}
