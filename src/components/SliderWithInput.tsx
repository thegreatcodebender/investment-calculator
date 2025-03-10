import { InputValueType } from "../types/inputField";
import { SliderWithInputProps } from "../types/sliderWithInput";
import { omitFirstWord } from "../utils/display";
import { RupeeIcon } from "./Icons";
import InputField from "./InputField";
import { ToWords } from "to-words";

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
  tooltipText,
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
    if (onChange) onChange(e);
  };

  /**
   * Get legend with unit for input
   * @param {string | number} legendValue Value to be shown as legend
   * @returns Legend with unit
   */
  const getLegend = (legendValue: string | number) => {
    switch (inputValueType) {
      case InputValueType.Currency:
        return (
          <span className="flex gap-0.5 items-center">
            <span aria-hidden>
              <RupeeIcon className="h-[10px] opacity-75" />
            </span>

            {legendValue.toString()[0] +
              " " +
              (typeof legendValue === "number"
                ? omitFirstWord(toWords.convert(legendValue))
                : "Error")}
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
          tooltipText={tooltipText}
          onChange={onChange}
          inputClassName={inputClassName}
        />
      </div>
      <div className="mt-2">
        <div className="slider-wrapper">
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
          />
          <div
            className="slider-track mt-[-8px]"
            style={
              {
                "--track-active-width": `${(
                  ((Number(actualValue) - min) / (max - min)) *
                  100
                ).toFixed(2)}%`,
              } as React.CSSProperties
            }
          ></div>
        </div>
        <div className="mt-1.5 flex justify-between w-full text-xs" aria-hidden>
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
