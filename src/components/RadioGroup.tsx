import Radio from "./Radio";
interface RadioGroupProps {
  name: string;
  selectedRadioLabel: string;
  data: string[];
  title?: string;
  containerClassName?: string;
  onChange: (args: any) => void;
}

const RadioGroup = ({
  name,
  selectedRadioLabel,
  data,
  title,
  containerClassName,
  onChange,
}: RadioGroupProps) => {
  return (
    <fieldset
      className={`min-md:flex gap-4 ${
        containerClassName ? containerClassName : ""
      }`}
    >
      {title && (
        <legend className="text-sm uppercase font-semibold block mb-2">
          {title}
        </legend>
      )}
      {data.map((radioLabel, index) => (
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
