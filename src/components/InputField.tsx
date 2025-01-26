import rupeeIcon from "../assets/images/rupee.svg";

export interface InputFieldProps {
  label: string;
  isLabelHidden?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  inputValueText?: string;
  id: string;
  placeholder: string;
  value: string | number;
  isRupee?: boolean;
  isYear?: boolean;
  isPercent?: boolean;
  errorText?: string;
  onChange?: (args: any) => void;
}

const InputField = ({
  label,
  isLabelHidden,
  containerClassName,
  inputClassName,
  inputValueText,
  id,
  placeholder,
  value,
  isRupee,
  errorText,
  onChange,
}: InputFieldProps) => {
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
      {isRupee ? (
        <>
          <div
            className={`relative${
              inputValueText ? " min-md:inline-block" : ""
            }`}
          >
            <span
              className={`absolute left-3 top-[14px] ${
                inputValueText ? "min-md:top-[22px]" : ""
              }`}
            >
              <img src={rupeeIcon} alt="Rupees" className="w-[10px]" />
            </span>
            <input
              type="text"
              id={id}
              name={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={`${errorText ? "border-red-500" : ""} ${
                inputClassName ? inputClassName : ""
              } border-1 border-input-border rounded-sm font-medium px-3 py-2 ps-[26px] block mt-2 focus-visible:outline-primary`}
            />
          </div>
          {inputValueText && (
            <span className="min-md:inline-block min-md:ms-2 text-xs">
              {inputValueText}
            </span>
          )}
        </>
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${errorText ? "border-red-500" : ""} ${
            inputClassName ? inputClassName : ""
          } border-1 border-input-border rounded-sm font-medium px-3 py-2 block mt-2 focus-visible:outline-primary`}
        />
      )}
      {errorText && <p className="mt-2 text-xs text-red-500">{errorText}</p>}
    </div>
  );
};

export default InputField;
