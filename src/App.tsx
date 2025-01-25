import "./App.css";
import CalculationCard from "./components/CalculationCard";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mt-8 mx-auto">
        <h1 className="text-3xl font-medium mb-2">
          Calculate returns for your investment
        </h1>
        <p className="text-base">
          Fuel your investment journey by placing your expectations upfront!
        </p>
        <div className="flex gap-6 mt-4">
          <CalculationCard />
        </div>
      </main>
    </>
  );
};

export default App;
