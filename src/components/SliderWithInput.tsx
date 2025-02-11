import { omitFirstWord } from "../utils/display";
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
  value: inputValue,
  isRupee,
  isYear,
  isPercent,
  errorText,
  onChange,
}: SliderWithInputProps) => {
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
    switch (true) {
      case isRupee:
        return (
          <span className="flex gap-0.5 items-center">
            {isRupee && (
              <span aria-hidden>
                <RupeeIcon className="h-[10px] opacity-75" />
              </span>
            )}
            {legendValue.toString()[0] +
              " " +
              omitFirstWord(toWords.convert(legendValue))}
          </span>
        );
      case isYear:
        return <span>{legendValue} Years</span>;
      case isPercent:
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
          isRupee ? "flex max-md:flex-col gap-3 min-md:items-end" : ""
        }`}
      >
        <InputField
          label={label}
          id={id}
          placeholder={placeholder}
          value={inputValue}
          isLabelHidden={isLabelHidden}
          isRupee={isRupee}
          errorText={errorText}
          onChange={onChange}
          inputClassName="w-[130px]"
          // inputValueText={
          //   isRupee
          //     ? toWords.convert(inputValue, { currency: true })
          //     : undefined
          // }
        />
      </div>
      <div className="mt-2">
        <input
          type="range"
          name={id + "-slider"}
          min={min}
          max={max}
          step={step}
          value={inputValue}
          id={id + "-slider"}
          onChange={handleSliderChange}
          className="slider"
          style={
            {
              "--track-active-width": `${
                ((inputValue - min) / (max - min)) * 100
              }%`,
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
        <label htmlFor={id + "-slider"} className="sr-only"></label>
      </div>
    </fieldset>
  );
};

export default SliderWithInput;
