import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CurrencyLocales } from "../types/currencyContext";
import { CURRENCY_STORAGE_KEY } from "../constants/currency";

const CurrencyContext = createContext<
  [CurrencyLocales, (currency: CurrencyLocales) => void] | null
>(null);

/** Currency locale */
export const CurrencyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currencyLocale, setCurrencyLocale] = useState<CurrencyLocales>(() => {
    const currency = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (
      currency &&
      Object.values(CurrencyLocales).find((locale) => currency === locale)
    ) {
      return currency as CurrencyLocales;
    }
    return CurrencyLocales.IN;
  });

  const handleCurrencyLocaleChange = (currency: CurrencyLocales) => {
    setCurrencyLocale(currency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  };

  return (
    <CurrencyContext.Provider
      value={[currencyLocale, handleCurrencyLocaleChange]}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

/** Custom hook to extract current currency locale */
export const useCurrencyLocale = () => {
  const currency = useContext(CurrencyContext);
  if (!currency) throw new Error("Currency context is not valid");
  return currency;
};
