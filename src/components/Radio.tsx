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
    <div className={containerClassName}>
      <label htmlFor={id}>{label}</label>
      <input
        type="radio"
        name={name}
        id={id}
        className={inputClassName}
        checked={isChecked}
        onChange={() => onChange(label)}
      />
    </div>
  );
};

export default Radio;
