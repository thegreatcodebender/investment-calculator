import { omitFirstWord } from "../utils/display";
import { RupeeIcon } from "./Icons";
import InputField, { InputFieldProps, InputValueType } from "./InputField";
import { ToWords } from "to-words";

interface SliderWithInputProps extends InputFieldProps {
  min: number;
  max: number;
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
  inputClassName,
  id,
  label,
  placeholder,
  value,
  inputValueType,
  errorText,
  onChange,
}: SliderWithInputProps) => {
  const inputValue = typeof value === "object" ? value.inputValue : value;
  const actualValue = typeof value === "object" ? value.actualValue : value;
  // ToWords instance for converting number to words
  const toWords = new ToWords({
    converterOptions: {
      doNotAddOnly: true,
    },
  });

  // To handle slider input change and active track width
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  const getLegend = (legendValue: any) => {
    switch (inputValueType) {
      case InputValueType.Currency:
        return (
          <span className="flex gap-0.5 items-center">
            <span aria-hidden>
              <RupeeIcon className="h-[10px] opacity-75" />
            </span>

            {legendValue.toString()[0] +
              " " +
              omitFirstWord(toWords.convert(legendValue))}
          </span>
        );
      case InputValueType.Year:
        return <span>{legendValue} Years</span>;
      case InputValueType.Percent:
        return <span>{legendValue}%</span>;
      default:
        break;
    }
  };
  return (
    <fieldset className={containerClassName}>
      <legend className="sr-only">{label}</legend>
      <div
        className={`${
          inputValueType ? "flex max-md:flex-col gap-3 min-md:items-end" : ""
        }`}
      >
        <InputField
          label={label}
          id={id}
          placeholder={placeholder}
          value={inputValue}
          isLabelHidden={isLabelHidden}
          inputValueType={inputValueType}
          errorText={errorText}
          onChange={onChange}
          inputClassName={inputClassName}
        />
      </div>
      <div className="mt-2">
        <input
          type="range"
          name={id + "-slider"}
          min={min}
          max={max}
          step={step}
          value={actualValue}
          id={id + "-slider"}
          onChange={handleSliderChange}
          className="slider"
          style={
            {
              "--track-active-width": `${(
                ((Number(actualValue) - min) / (max - min)) *
                100
              ).toFixed(2)}%`,
            } as React.CSSProperties
          }
        />
        <div
          className="mt-[2px] flex justify-between w-full text-xs"
          aria-hidden
        >
          {getLegend(min)}
          {getLegend(max)}
        </div>
        <label htmlFor={id + "-slider"} className="sr-only">
          {label}
        </label>
      </div>
    </fieldset>
  );
};

export default SliderWithInput;
