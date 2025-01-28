import React, { useState } from "react";
import Card from "./Card";
import Tab from "./Tab";
import SliderWithInput from "./SliderWithInput";
import RadioGroup from "./RadioGroup";
import { INVESTMENT_NATURE_LIST } from "../constants/investmentNature";

const CalculationCard = () => {
  const [targetAmount, setTargetAmount] = useState(1500000);
  const [duration, setDuration] = useState(8);
  const [interest, setInterest] = useState(10);
  const [investmentNature, setInvestmentNature] = useState(
    INVESTMENT_NATURE_LIST[0]
  );
  return (
    <Card className="w-full min-lg:w-[60%]">
      {/* Tab navigation */}
      <nav className="flex text-base font-medium" aria-label="I know my">
        <Tab isActive>Target Amount</Tab>
        <Tab>Investment Amount</Tab>
      </nav>
      {/* Input fields */}
      <div className="mt-6">
        <SliderWithInput
          min={1000}
          max={10000000}
          step={500}
          label="Target amount"
          id="target-amount-input"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTargetAmount(Number(e.target.value));
          }}
          isRupee
        />
        <SliderWithInput
          min={1}
          max={60}
          label="Duration"
          id="duration-input"
          placeholder="Duration"
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDuration(Number(e.target.value));
          }}
          containerClassName="mt-6"
          isYear
        />
        <SliderWithInput
          min={1}
          max={30}
          step={0.25}
          label="Expected Interest Rate"
          id="duration-input"
          placeholder="Duration"
          value={interest}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInterest(Number(e.target.value));
          }}
          containerClassName="mt-6"
          isPercent
        />
        <RadioGroup
          name="investment-nature"
          selectedRadioLabel={investmentNature}
          data={INVESTMENT_NATURE_LIST}
          onChange={(label: string) => {
            setInvestmentNature(label);
          }}
        />
      </div>
    </Card>
  );
};

export default CalculationCard;
