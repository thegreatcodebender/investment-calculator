import { omitFirstWord } from "../utils/numberToWords";
import { RupeeIcon } from "./Icons";
import InputField, { InputFieldProps } from "./InputField";
import { ToWords } from "to-words";

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
  const toWords = new ToWords({
    converterOptions: {
      doNotAddOnly: true,
    },
  });
  return (
    <fieldset className={containerClassName}>
      <legend className="sr-only">{label}</legend>
      <div
        className={`${
          isRupee ? "flex max-md:flex-col gap-3 min-md:items-end" : ""
        }`}
      >
        <InputField
          label={label}
          id={id}
          placeholder={placeholder}
          value={value}
          isLabelHidden={isLabelHidden}
          isRupee={isRupee}
          errorText={errorText}
          onChange={onChange}
          inputClassName="w-[130px]"
        />
        {isRupee && (
          <span className="text-xs">
            {toWords.convert(value, { currency: true })}
          </span>
        )}
      </div>
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
        <div
          className="mt-[2px] flex justify-between w-full text-xs"
          aria-hidden
        >
          <span className="flex gap-0.5 items-center">
            {isRupee && (
              <span aria-hidden>
                <RupeeIcon className="h-[10px] opacity-75" />
              </span>
            )}
            {min.toString()[0] + " " + omitFirstWord(toWords.convert(min))}
          </span>
          <span className="flex gap-0.5 items-center">
            {isRupee && (
              <span aria-hidden>
                <RupeeIcon className="h-[10px] opacity-75" />
              </span>
            )}
            {max.toString()[0] + " " + omitFirstWord(toWords.convert(max))}
          </span>
        </div>
        <label htmlFor={id + "-slider"} className="sr-only"></label>
      </div>
    </fieldset>
  );
};

export default SliderWithInput;
