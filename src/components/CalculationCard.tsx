import React, { useState } from "react";
import Card from "./Card";
import Tab from "./Tab";
import SliderWithInput from "./SliderWithInput";

const CalculationCard = () => {
  const [targetAmount, setTargetAmount] = useState(1500000);
  return (
    <Card className="w-full min-lg:w-[60%]">
      <nav className="flex text-base font-medium" aria-label="I know my">
        <Tab isActive>Target Amount</Tab>
        <Tab>Investment Amount</Tab>
      </nav>
      <div className="mt-6">
        <SliderWithInput
          min={0}
          max={10000000}
          step={1000}
          label="Target amount"
          id="target-amount-input"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTargetAmount(Number(e.target.value));
            console.log(e.target.value);
          }}
          isRupee
        />
      </div>
    </Card>
  );
};

export default CalculationCard;
