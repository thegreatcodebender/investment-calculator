import { RadioProps } from "../types/radio";

const Radio = ({
  isChecked,
  containerClassName,
  id,
  name,
  label,
  inputClassName,
  onChange,
}: RadioProps) => {
  return (
    <div
      className={`max-sm:not-last:mb-2 ${
        containerClassName ? containerClassName : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        id={id}
        className={`sr-only ${inputClassName ? inputClassName : ""}`}
        checked={isChecked}
        onChange={() => onChange(label)}
      />
      <label htmlFor={id} className="relative">
        {label}
      </label>
    </div>
  );
};

export default Radio;
