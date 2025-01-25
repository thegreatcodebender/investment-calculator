import { useState } from "react";
import Card from "./Card";
import InputField from "./InputField";
import Tab from "./Tab";

const CalculationCard = () => {
  const [targetAmount, setTargetAmount] = useState(100000);
  return (
    <Card className="w-full min-lg:w-[60%]">
      <nav className="flex text-base font-medium" aria-label="I know my">
        <Tab isActive>Target Amount</Tab>
        <Tab>Investment Amount</Tab>
      </nav>
      <div className="mt-6">
        <InputField
          label="Target amount"
          id="target-amount-input"
          placeholder="Target amount"
          value={targetAmount}
          isRupee
        />
      </div>
    </Card>
  );
};

export default CalculationCard;
