import rupeeIcon from "../assets/images/rupee.svg";

interface InputField {
  label: string;
  isLabelHidden?: boolean;
  containerClassName?: string;
  id: string;
  placeholder: string;
  value: string | number;
  isRupee?: boolean;
  onChange?: () => void;
}

const InputField = ({
  label,
  isLabelHidden,
  containerClassName,
  id,
  placeholder,
  value,
  isRupee,
  onChange,
}: InputField) => {
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
            <img src={rupeeIcon} alt="Rupee" className="w-[10px]" />
          </span>
          <input
            type="text"
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border-1 border-input-border rounded-sm font-medium px-3 py-2 ps-[26px] block mt-2 focus-visible:outline-primary"
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
          className="border-1 border-input-border rounded-sm font-medium px-3 py-2 block mt-2 focus-visible:outline-primary"
        />
      )}
    </div>
  );
};

export default InputField;
