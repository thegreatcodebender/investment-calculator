import Card from "./Card";
import useIsMobile from "../hooks/useIsMobile";
import ProgressionLineGraph from "./ProgressionLineGraph";
import { useCurrencyLocale } from "../context/CurrencyContext";
import { CurrencyLocales } from "../types/currencyContext";

const LineGraphCard = () => {
  const isMobile = useIsMobile();
  const [currencyLocale] = useCurrencyLocale();
  return (
    <Card className="max-lg:mt-8 min-w-[300px] mt-6">
      <h3 className="mb-0.5 text-lg font-semibold leading-snug">
        Feel the investment progression
      </h3>
      <p className="mb-2 text-sm text-gray-600">
        An interactive chart showing how your investment grows over time.{" "}
        {isMobile ? "Touch " : "Hover over "}
        the chart to know more.
      </p>
      <div style={{ height: isMobile ? 350 : 300 }}>
        <ProgressionLineGraph height={isMobile ? 350 : 300} />
      </div>
      {currencyLocale === CurrencyLocales.IN && (
        <p className="text-xs text-gray-600">
          KCr - Thousand Crores, LCr - Lakh Crores
        </p>
      )}
    </Card>
  );
};

export default LineGraphCard;
