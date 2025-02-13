import { BrowserRouter } from "react-router-dom";
import "./App.css";
import CalculationCard from "./components/CalculationCard";
import Header from "./components/Header";
import ResultCard from "./components/ResultCard";
import { InvestmentProvider } from "./context/InvestmentContext";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-[1100px] mt-4 md:mt-8 mx-auto px-4">
        <h1 className="text-3xl max-md:text-2xl font-medium mb-1">
          Calculate returns for your investment
        </h1>
        <p className="text-base">
          Fuel your investment journey by placing your expectations upfront!
        </p>
        <div className="min-lg:flex gap-6 my-4">
          <InvestmentProvider>
            <CalculationCard />
            <ResultCard />
          </InvestmentProvider>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
