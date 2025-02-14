import rupeeIcon from "../assets/images/rupee.svg";
import { InputAndActualValue } from "../context/InvestmentContext";
import { amountINRWithComma, removeCommaFromString } from "../utils/display";

export enum InputValueType {
  Year = "year",
  Currency = "currency",
  Percent = "percent",
}

export interface InputFieldProps {
  label: string;
  isLabelHidden?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  id: string;
  placeholder: string;
  value: string | number | InputAndActualValue;
  inputValueType?: InputValueType;
  errorText?: string;
  onChange?: (args: any) => void;
}

const InputField = ({
  label,
  isLabelHidden,
  containerClassName,
  inputClassName,
  id,
  placeholder,
  value,
  inputValueType,
  errorText,
  onChange,
}: InputFieldProps) => {
  const inputValue =
    typeof value === "object"
      ? value.inputValue === -1
        ? ""
        : value.inputValue
      : value; // Show the value.inputValue so that even if user types in unsupported format, it will be shown in the input field
  const commaRemovedInputValue = removeCommaFromString(inputValue);
  const isCurrency = inputValueType === InputValueType.Currency;
  const isYear = inputValueType === InputValueType.Year;
  const isPercent = inputValueType === InputValueType.Percent;
  return (
    <div className={`${containerClassName ? containerClassName : ""}`}>
      <label
        className={`text-sm uppercase font-semibold block ${
          isLabelHidden ? " sr-only" : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      {inputValueType ? (
        <>
          <div className={`relative`}>
            <span
              className={`absolute ${
                isCurrency
                  ? "left-3 top-[14px]"
                  : isYear
                  ? "left-14 top-[13px]"
                  : isPercent && "left-18 top-[13px]"
              }`}
            >
              {isCurrency ? (
                <img src={rupeeIcon} alt="Rupees" className="w-[10px]" />
              ) : (
                <p className="leading-none">
                  {isPercent ? "%" : isYear && "Years"}
                </p>
              )}
            </span>
            <input
              type="text"
              id={id}
              name={id}
              placeholder={placeholder}
              inputMode="numeric"
              autoComplete="off"
              value={
                isCurrency && !isNaN(Number(commaRemovedInputValue))
                  ? amountINRWithComma(Number(commaRemovedInputValue))
                  : inputValue
              }
              onChange={onChange}
              className={`${
                errorText ? "border-red-500 focus-visible:outline-red-500" : ""
              } ${
                inputClassName ?? ""
              } border-1 border-input-border rounded-sm font-medium px-3 py-2 ${
                isCurrency
                  ? "ps-[26px]"
                  : isPercent
                  ? "pe-8"
                  : isYear && "pe-15"
              }
               block mt-2 focus-visible:outline-primary`}
            />
          </div>
        </>
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          inputMode="text"
          autoComplete="off"
          value={inputValue}
          onChange={onChange}
          className={`${errorText ? "border-red-500" : ""} ${
            inputClassName ?? ""
          } border-1 border-input-border rounded-sm font-medium px-3 py-2 block mt-2 focus-visible:outline-primary`}
        />
      )}
      {errorText && <p className="mt-2 text-xs text-red-500">{errorText}</p>}
    </div>
  );
};

export default InputField;
