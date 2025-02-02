import React, { useState } from "react";
import Card from "./Card";
import Tab from "./Tab";
import SliderWithInput from "./SliderWithInput";
import RadioGroup from "./RadioGroup";
import { INVESTMENT_NATURE_LIST } from "../constants/investmentNature";
import InputField from "./InputField";

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
        <div className="min-sm:flex gap-14 mt-6">
          <RadioGroup
            name="investment-nature"
            title="Investment Nature"
            selectedRadioLabel={investmentNature}
            data={INVESTMENT_NATURE_LIST}
            onChange={(label: string) => {
              setInvestmentNature(label);
            }}
          />
          <InputField
            label="Current age (optional)"
            id="current-age"
            value={""}
            placeholder=""
            containerClassName="max-sm:mt-6"
            inputClassName="w-[64px]"
          />
        </div>
      </div>
    </Card>
  );
};

export default CalculationCard;
