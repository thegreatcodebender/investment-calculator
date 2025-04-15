import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CurrencyLocales } from "../types/currencyContext";

const CurrencyContext = createContext<
  | [CurrencyLocales, React.Dispatch<React.SetStateAction<CurrencyLocales>>]
  | null
>(null);

/** Currency locale */
export const CurrencyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currencyLocale, setCurrencyLocale] = useState(CurrencyLocales.IN);
  return (
    <CurrencyContext.Provider value={[currencyLocale, setCurrencyLocale]}>
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
