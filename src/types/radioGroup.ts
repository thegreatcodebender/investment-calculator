import { INVESTMENT_NATURE_LIST } from "../constants/investment";

export interface RadioGroupProps {
  name: string;
  selectedRadioLabel: string;
  data: typeof INVESTMENT_NATURE_LIST;
  title?: string;
  containerClassName?: string;
  tooltipText?: string;
  onChange: (label: string) => void;
}
