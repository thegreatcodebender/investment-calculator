import InputField, { InputFieldProps } from "./InputField";

interface SliderWithInputProps extends InputFieldProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  id: string;
  isLabelHidden?: boolean;
}

const SliderWithInput = ({
  min,
  max,
  step = 1,
  isLabelHidden,
  containerClassName,
  id,
  label,
  placeholder,
  value,
  isRupee,
  errorText,
  onChange,
}: SliderWithInputProps) => {
  return (
    <fieldset className={containerClassName}>
      <legend className="sr-only">{label}</legend>
      <InputField
        label={label}
        id={id}
        placeholder={placeholder}
        value={value}
        isLabelHidden={isLabelHidden}
        isRupee={isRupee}
        errorText={errorText}
        onChange={onChange}
      />
      <div className="mt-3 ">
        <input
          type="range"
          name={id + "-slider"}
          min={min}
          max={max}
          step={step}
          value={value}
          id={id + "-slider"}
          onChange={onChange}
          className="slider"
          style={
            {
              "--track-active-width": `${((value / max) * 100).toFixed(0)}%`,
            } as React.CSSProperties
          }
        />
        <label htmlFor={id + "-slider"} className="sr-only"></label>
      </div>
    </fieldset>
  );
};

export default SliderWithInput;
