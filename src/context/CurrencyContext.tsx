import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CurrencyLocales } from "../types/currencyContext";
import { CURRENCY_STORAGE_KEY } from "../constants/currency";

const CurrencyContext = createContext<
  [CurrencyLocales, (currency: CurrencyLocales) => void] | null
>(null);

/** Currency locale provider */
export const CurrencyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currencyLocale, setCurrencyLocale] = useState<CurrencyLocales>(() => {
    const currency = localStorage.getItem(CURRENCY_STORAGE_KEY);
    // Check if locally stored locale is legible
    if (
      currency &&
      Object.values(CurrencyLocales).find((locale) => currency === locale)
    ) {
      return currency as CurrencyLocales; // Update with stored value
    }
    return CurrencyLocales.IN; // Update with IN locale if stored one is not legible
  });

  /**
   * Update currency locale change
   * @param currency Currency locale
   */
  const handleCurrencyLocaleChange = (currency: CurrencyLocales) => {
    // If a value other than expected locale is passed as arg, ignore it
    if (!Object.values(CurrencyLocales).includes(currency)) {
      return;
    }
    setCurrencyLocale(() => {
      return currency;
    }); // Update locale state
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency); // Update in localStorage
  };

  return (
    <CurrencyContext.Provider
      value={[currencyLocale, handleCurrencyLocaleChange]}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Custom hook to extract current currency locale
 * @returns Currency locale
 */
export const useCurrencyLocale = () => {
  const currency = useContext(CurrencyContext);
  if (!currency) throw new Error("Currency context is not valid");
  return currency;
};
