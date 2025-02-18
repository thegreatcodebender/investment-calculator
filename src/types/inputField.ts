import { InputAndActualValue } from "./investmentContext";

export enum InputValueType {
  Year = "year",
  Currency = "currency",
  Percent = "percent",
}

export interface InputFieldProps {
  label: string;
  isLabelHidden?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  id: string;
  placeholder: string;
  value: string | number | InputAndActualValue;
  inputValueType?: InputValueType;
  errorText?: string;
  onChange?: (args: unknown) => void;
}
