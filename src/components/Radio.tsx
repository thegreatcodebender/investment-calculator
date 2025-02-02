interface RadioProps {
  isChecked?: boolean;
  name: string;
  containerClassName?: string;
  id: string;
  label: string;
  inputClassName?: string;
  onChange: (args: any) => void;
}

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
      className={`not-last:mb-2 ${
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
