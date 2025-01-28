import Radio from "./Radio";
interface RadioGroupProps {
  name: string;
  selectedRadioLabel: string;
  data: string[];
  onChange: (args: any) => void;
}

const RadioGroup = ({
  name,
  selectedRadioLabel,
  data,
  onChange,
}: RadioGroupProps) => {
  return (
    <div>
      {data.map((radioLabel, index) => (
        <Radio
          name={name}
          id={name + "radio" + index}
          label={radioLabel}
          key={radioLabel}
          isChecked={radioLabel === selectedRadioLabel}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
