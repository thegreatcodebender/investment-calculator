import React from "react";
import Card from "./Card";
import Tab from "./Tab";
import SliderWithInput from "./SliderWithInput";
import RadioGroup from "./RadioGroup";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";
import InputField from "./InputField";
import {
  ActionType,
  useInvestmentDispatch,
  useInvestmentState,
} from "../context/InvestmentContext";

const CalculationCard = () => {
  const investmentState = useInvestmentState();
  const dispatchInvestment = useInvestmentDispatch();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age;
  const activeMode = investmentState.mode;
  return (
    <Card className="w-full min-lg:w-[60%]">
      {/* Tab navigation */}
      <nav className="flex text-base font-medium" aria-label="I know my">
        {INVESTMENT_MODES.map(({ title, defaultAmount }) => (
          <Tab
            isActive={activeMode.title === title}
            key={title}
            onClick={() =>
              dispatchInvestment({
                type: ActionType.Mode,
                payload: { title, defaultAmount },
              })
            }
          >
            {title}
          </Tab>
        ))}
      </nav>
      {/* Input fields */}
      <div className="mt-6">
        <SliderWithInput
          min={1000}
          max={10000000}
          step={500}
          label={activeMode.title}
          id="target-amount-input"
          placeholder={activeMode.title}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatchInvestment({
              type: ActionType.Amount,
              payload: e.target.value,
            });
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
            dispatchInvestment({
              type: ActionType.Duration,
              payload: Number(e.target.value),
            });
          }}
          containerClassName="mt-6"
          isYear
        />
        <SliderWithInput
          min={1}
          max={20}
          step={0.1}
          label="Expected Interest Rate"
          id="duration-input"
          placeholder="Duration"
          value={interest}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatchInvestment({
              type: ActionType.InterestRate,
              payload: Number(e.target.value),
            });
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
              dispatchInvestment({
                type: ActionType.InvestmentNature,
                payload: label,
              });
            }}
          />
          <InputField
            label="Current age (optional)"
            id="current-age"
            value={age !== -1 ? age : ""}
            placeholder=""
            containerClassName="max-sm:mt-6"
            inputClassName="w-[64px]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatchInvestment({
                type: ActionType.Age,
                payload: Number(e.target.value),
              });
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default CalculationCard;
