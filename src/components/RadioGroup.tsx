import { RadioGroupProps } from "../types/radioGroup";
import Radio from "./Radio";
import Tooltip from "./Tooltip";

const RadioGroup = ({
  name,
  selectedRadioLabel,
  data,
  title,
  containerClassName,
  tooltipText,
  onChange,
}: RadioGroupProps) => {
  return (
    <fieldset className={`${containerClassName ? containerClassName : ""}`}>
      {title && (
        <div className="flex items-center mb-2">
          <legend
            className={`text-sm uppercase font-semibold block${
              tooltipText ? ` leading-none` : ""
            }`}
          >
            {title}
          </legend>
          {tooltipText && <Tooltip tooltipContent={tooltipText} />}
        </div>
      )}
      <div className="sm:flex gap-6 flex-wrap">
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
      </div>
    </fieldset>
  );
};

export default RadioGroup;
