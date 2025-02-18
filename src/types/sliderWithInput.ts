import { InputFieldProps } from "./inputField";

export interface SliderWithInputProps extends InputFieldProps {
  min: number;
  max: number;
  step?: number;
  id: string;
  isLabelHidden?: boolean;
}
