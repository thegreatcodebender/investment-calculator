import "./App.css";
import Header from "./components/Header";
import { InvestmentProvider } from "./context/InvestmentContext";
import Footer from "./components/Footer";
import CalculationsAndResults from "./components/CalculationsAndResults";
import FAQCard from "./components/FAQCard";

const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mt-4 md:mt-8 mx-auto px-4">
        <h1 className="text-3xl max-md:text-2xl font-medium mb-1">
          Calculate returns for your investment
        </h1>
        <p className="text-base">
          Fuel your investment journey by placing your expectations upfront!
        </p>
        <InvestmentProvider>
          <CalculationsAndResults />
        </InvestmentProvider>
        <FAQCard />
      </main>
      <Footer />
    </>
  );
};

export default App;
