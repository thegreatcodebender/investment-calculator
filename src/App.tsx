import "./App.css";
import Header from "./components/Header";
import { InvestmentProvider } from "./context/InvestmentContext";
import Footer from "./components/Footer";
import CalculationsAndResults from "./components/CalculationsAndResults";
import FAQCard from "./components/FAQCard";
import { CurrencyProvider } from "./context/CurrencyContext";
import CurrencySelection from "./components/CurrencySelection";

const App = () => {
  return (
    <>
      <Header />
      <CurrencyProvider>
        <main className="max-w-[1100px] mt-4 md:mt-8 mx-auto px-4">
          <InvestmentProvider>
            <div className="sm:flex gap-2 justify-between items-center">
              <div className="max-sm:mb-4">
                <h1 className="text-3xl max-md:text-2xl tracking-[-1px] font-medium mb-1">
                  Calculate returns for your investment
                </h1>
                <p className="text-base">
                  Fuel your investment journey by placing your expectations
                  upfront!
                </p>
              </div>
              <CurrencySelection />
            </div>
            <CalculationsAndResults />
          </InvestmentProvider>
          <FAQCard />
        </main>
      </CurrencyProvider>

      <Footer />
    </>
  );
};

export default App;
