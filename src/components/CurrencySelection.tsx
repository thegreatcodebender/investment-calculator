import { useId } from "react";
import { useCurrencyLocale } from "../context/CurrencyContext";
import { CurrencyLocales } from "../types/currencyContext";
import {
  useInvestmentDispatch,
  useInvestmentState,
} from "../context/InvestmentContext";
import { ActionType } from "../types/investmentContext";

const CurrencySelection = () => {
  const selectId = useId();
  const [currencyLocale, setCurrencyLocale] = useCurrencyLocale();
  const investmentState = useInvestmentState();
  const dispatchInvestment = useInvestmentDispatch();
  const investmentMode = investmentState.mode;

  /**
   * Update currency locale and amount value if greater than the default value of that locale
   * @param localeVal Currency locale value
   */
  const handleCurrencyLocaleChange = (localeVal: CurrencyLocales) => {
    setCurrencyLocale(localeVal);
    dispatchInvestment({
      type: ActionType.LocaleAmountInflation,
      payload: {
        modeShortName: investmentMode.shortName,
        currencyLocale: localeVal,
      },
    });
  };
  return (
    <div className="sm:flex justify-end items-end">
      <label htmlFor={selectId} className="sr-only">
        Currency
      </label>
      <div className="select-wrapper relative bg-white border-1 border-gray-200 rounded-md">
        <select
          id={selectId}
          className="max-sm:w-full px-3.5 py-3.5 pe-7.5 shadow-card text-gray-600 font-medium leading-none"
          onChange={(e) =>
            handleCurrencyLocaleChange(e.target.value as CurrencyLocales)
          }
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
