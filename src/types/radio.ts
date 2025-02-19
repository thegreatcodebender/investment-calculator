export interface RadioProps {
  isChecked?: boolean;
  name: string;
  containerClassName?: string;
  id: string;
  label: string;
  inputClassName?: string;
  onChange: (label: string) => void;
}
