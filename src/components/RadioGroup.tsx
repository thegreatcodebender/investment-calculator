import { RadioGroupProps } from "../types/radioGroup";
import Radio from "./Radio";

const RadioGroup = ({
  name,
  selectedRadioLabel,
  data,
  title,
  containerClassName,
  onChange,
}: RadioGroupProps) => {
  return (
    <fieldset className={`${containerClassName ? containerClassName : ""}`}>
      {title && (
        <legend className="text-sm uppercase font-semibold block mb-2">
          {title}
        </legend>
      )}
      {data.map(({ title: radioLabel }, index) => (
        <Radio
          name={name}
          id={name + "-radio-" + index}
          label={radioLabel}
          key={radioLabel}
          isChecked={radioLabel === selectedRadioLabel}
          onChange={onChange}
        />
      ))}
    </fieldset>
  );
};

export default RadioGroup;
