import "./App.css";
import Header from "./components/Header";
import { InvestmentProvider } from "./context/InvestmentContext";
import Footer from "./components/Footer";
import CalculationsAndResults from "./components/CalculationsAndResults";
import FAQCard from "./components/FAQCard";
import { CurrencyProvider } from "./context/CurrencyContext";
import CurrencySelection from "./components/CurrencySelection";
import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [isFooterAbsolute, setIsFooterAbsolute] = useState(false); // For footer absolute behaviour

  /** To make footer absolute for #root height below 1920px (to accodomodate chart image) */
  const handleWindowResize = useDebounce(() => {
    const bodyElem = document.querySelector("body");
    if (bodyElem) {
      setIsFooterAbsolute(bodyElem.scrollHeight < 1920);
      console.log(bodyElem.scrollHeight);
    }
  });

  // To handle window resize events
  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div
      className={`${
        isFooterAbsolute ? "pb-[232px] relative min-h-[1920px]" : ""
      }`}
    >
      <Header />
      <CurrencyProvider>
        <main className="max-w-[1100px] mt-4 md:mt-8 mx-auto px-4">
          <InvestmentProvider>
            <div className="sm:flex gap-2 justify-between items-center">
              <div className="max-sm:mb-4">
                <h1 className="text-3xl max-md:text-2xl tracking-[-1px] font-medium mb-1">
                  Calculate Your Potential Returns
                </h1>
                <p className="text-base mb-1">
                  Plan your financial future with confidence. Estimate returns
                  based on your goals, time horizon, and investment strategy.
                </p>
              </div>
              <CurrencySelection />
            </div>
            <CalculationsAndResults />
          </InvestmentProvider>
          <FAQCard />
        </main>
      </CurrencyProvider>
      <Footer isAbsolute={isFooterAbsolute} />
    </div>
  );
};

export default App;
