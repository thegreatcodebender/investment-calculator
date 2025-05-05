import { useCurrencyLocale } from "../context/CurrencyContext";
import { InputFieldProps, InputValueType } from "../types/inputField";
import { currencyWithComma, removeCommaFromString } from "../utils/display";
import { CurrencyIcon } from "./Icons";
import Tooltip from "./Tooltip";

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
  tooltipText,
  inputMode = "text",
  onChange,
}: InputFieldProps) => {
  const [currencyLocale] = useCurrencyLocale();
  const inputValue =
    typeof value === "object"
      ? value.inputValue === -1
        ? ""
        : value.inputValue
      : value; // Show the value.inputValue so that even if user types in unsupported format, it will be shown in the input field
  const commaRemovedInputValue = removeCommaFromString(inputValue);
  const noTrailingDecimalPoint =
    commaRemovedInputValue[commaRemovedInputValue.length - 1] !== ".";
  const isCurrency = inputValueType === InputValueType.Currency;
  const isYear = inputValueType === InputValueType.Year;
  const isPercent = inputValueType === InputValueType.Percent;
  return (
    <div className={`${containerClassName ? containerClassName : ""}`}>
      <div className="flex items-center">
        <label
          className={`text-sm uppercase font-semibold inline-block ${
            tooltipText ? "leading-none" : ""
          } ${isLabelHidden ? "sr-only" : ""}`}
          htmlFor={id}
        >
          {label}
        </label>
        {tooltipText && <Tooltip tooltipContent={tooltipText} />}
      </div>
      {inputValueType ? (
        <>
          <div className={`relative`}>
            <span
              className={`absolute pointer-events-none ${
                isCurrency
                  ? "left-3 top-[14px]"
                  : isYear
                  ? "left-14 top-[13px]"
                  : isPercent && "left-18 top-[13px]"
              }`}
            >
              {isCurrency ? (
                <CurrencyIcon className="w-[10px]" />
              ) : (
                <p className="leading-none select-none">
                  {isPercent ? "%" : isYear && "Years"}
                </p>
              )}
            </span>
            <input
              type="text"
              id={id}
              name={id}
              placeholder={placeholder}
              inputMode={isYear ? "numeric" : "decimal"}
              autoComplete="off"
              value={
                isCurrency &&
                !isNaN(Number(commaRemovedInputValue)) &&
                noTrailingDecimalPoint // Trailing decimal point prevents user from typing decimal values when i18n is used
                  ? currencyWithComma({
                      amount: Number(commaRemovedInputValue),
                      showDecimal: true,
                      currencyLocale,
                    })
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
          inputMode={inputMode}
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
