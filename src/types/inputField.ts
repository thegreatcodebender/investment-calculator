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
  tooltipText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
}
