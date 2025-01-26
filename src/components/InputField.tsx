import rupeeIcon from "../assets/images/rupee.svg";

export interface InputFieldProps {
  label: string;
  isLabelHidden?: boolean;
  containerClassName?: string;
  id: string;
  placeholder: string;
  value: string | number;
  isRupee?: boolean;
  errorText?: string;
  onChange?: (args: any) => void;
}

const InputField = ({
  label,
  isLabelHidden,
  containerClassName,
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
        className={`text-sm uppercase font-semibold ${
          isLabelHidden ? " sr-only" : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      {isRupee ? (
        <div className="relative">
          <span className="absolute left-3 top-[14px]">
            <img src={rupeeIcon} alt="Rupees" className="w-[10px]" />
          </span>
          <input
            type="text"
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${
              errorText ? "border-red-500" : ""
            } border-1 border-input-border rounded-sm font-medium px-3 py-2 ps-[26px] block mt-2 focus-visible:outline-primary`}
          />
        </div>
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${
            errorText ? "border-red-500" : ""
          } border-1 border-input-border rounded-sm font-medium px-3 py-2 block mt-2 focus-visible:outline-primary`}
        />
      )}
      {errorText && <p className="mt-2 text-xs text-red-500">{errorText}</p>}
    </div>
  );
};

export default InputField;
