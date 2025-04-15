import { memo } from "react";
import RupeesIcon from "../assets/images/rupee.svg";
import DollarIcon from "../assets/images/us_dollar.svg";
import { IconProps } from "../types/icon";
import { useCurrencyLocale } from "../context/CurrencyContext";
import { CurrencyLocales } from "../types/currencyContext";
import { CURRENCY } from "../constants/currency";

export const CurrencyIcon = memo(function CurrencyIcon({
  className,
}: IconProps) {
  const [currencyLocale] = useCurrencyLocale();
  return (
    <img
      src={currencyLocale === CurrencyLocales.IN ? RupeesIcon : DollarIcon}
      alt={CURRENCY[currencyLocale]}
      className={className}
    />
  );
});
