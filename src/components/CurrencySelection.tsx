import { useId } from "react";
import { useCurrencyLocale } from "../context/CurrencyContext";
import { CurrencyLocales } from "../types/currencyContext";

const CurrencySelection = () => {
  const selectId = useId();
  const [currencyLocale, setCurrencyLocale] = useCurrencyLocale();
  return (
    <div className="sm:flex justify-end items-end">
      <label htmlFor={selectId} className="sr-only">
        Currency
      </label>
      <div className="select-wrapper relative bg-white border-1 border-gray-200 rounded-md">
        <select
          id={selectId}
          className="max-sm:w-full px-3.5 py-3.5 pe-7.5 shadow-card text-gray-600 font-medium leading-none"
          onChange={(e) => setCurrencyLocale(e.target.value as CurrencyLocales)}
          value={currencyLocale}
        >
          <option value={CurrencyLocales.IN}>INR</option>
          <option value={CurrencyLocales.US}>USD</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencySelection;
