import { useId } from "react";
import { useCurrencyLocale } from "../context/CurrencyContext";
import { InputValueType } from "../types/inputField";
import { SliderWithInputProps } from "../types/sliderWithInput";
import { currencyInWords } from "../utils/display";
import { CurrencyIcon } from "./Icons";
import InputField from "./InputField";

const SliderWithInput = ({
  min,
  max,
  step = 1,
  isLabelHidden,
  containerClassName,
  inputClassName,
  label,
  placeholder,
  value,
  inputValueType,
  errorText,
  tooltipText,
  onChange,
}: SliderWithInputProps) => {
  const inputId = useId();
  const [currencyLocale] = useCurrencyLocale();
  const inputValue = typeof value === "object" ? value.inputValue : value;
  const actualValue = typeof value === "object" ? value.actualValue : value;

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
              <CurrencyIcon className="h-[10px] opacity-75" />
            </span>

            {typeof legendValue === "number"
              ? currencyInWords({ amount: legendValue, currencyLocale })
              : "Error"}
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
      {/* <legend className="sr-only">{label}</legend> */}
      <div
        className={`${
          inputValueType ? "flex max-md:flex-col gap-3 min-md:items-end" : ""
        }`}
      >
        <InputField
          label={label}
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
            name={inputId + "-slider"}
            min={min}
            max={max}
            step={step}
            value={actualValue}
            id={inputId + "-slider"}
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
        <label htmlFor={inputId + "-slider"} className="sr-only">
          {label + " (Slider)"}
        </label>
      </div>
    </fieldset>
  );
};

export default SliderWithInput;
