import React, { useState } from "react";
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
import { SLIDER_INPUT_METADATA } from "../constants/input";
import { SLIDER_ERROR_MESSAGE } from "../constants/errors";

const CalculationCard = () => {
  const [errors, setErrors] = useState({
    amount: "",
    duration: "",
    interestRate: "",
  });
  const investmentState = useInvestmentState();
  const dispatchInvestment = useInvestmentDispatch();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age;
  const activeMode = investmentState.mode;

  // To handle the input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    actionType: ActionType
  ) => {
    let isValid = true;
    const inputVal = e.target.value;
    const inputValFormatted = Number(inputVal.replace(/[^0-9.-]+/g, ""));

    // if (isNaN(Number(inputVal))) {
    //   return;
    // }

    switch (actionType) {
      case ActionType.Amount:
        if (
          inputValFormatted < SLIDER_INPUT_METADATA.AMOUNT.min ||
          inputValFormatted > SLIDER_INPUT_METADATA.AMOUNT.max
        ) {
          setErrors((prev) => ({
            ...prev,
            amount: SLIDER_ERROR_MESSAGE.AMOUNT.rangeError,
          }));
          isValid = false;
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            amount: "",
          }));
          isValid = true;
        }
        break;
      case ActionType.Duration:
        if (
          inputValFormatted < SLIDER_INPUT_METADATA.DURATION.min ||
          inputValFormatted > SLIDER_INPUT_METADATA.DURATION.max
        ) {
          setErrors((prev) => ({
            ...prev,
            duration: SLIDER_ERROR_MESSAGE.DURATION.rangeError,
          }));
          isValid = false;
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            duration: "",
          }));
          isValid = true;
        }
        break;
      case ActionType.InterestRate:
        if (
          inputValFormatted < SLIDER_INPUT_METADATA.INTEREST_RATE.min ||
          inputValFormatted > SLIDER_INPUT_METADATA.INTEREST_RATE.max
        ) {
          setErrors((prev) => ({
            ...prev,
            interestRate: SLIDER_ERROR_MESSAGE.INTEREST_RATE.rangeError,
          }));
          isValid = false;
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            interestRate: "",
          }));
          isValid = true;
        }
        break;
      default:
        break;
    }
    if (isValid) {
      dispatchInvestment({
        type: actionType,
        payload: inputValFormatted,
      });
    }
  };
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
          min={SLIDER_INPUT_METADATA.AMOUNT.min}
          max={SLIDER_INPUT_METADATA.AMOUNT.max}
          step={SLIDER_INPUT_METADATA.AMOUNT.step}
          label={activeMode.title}
          id={SLIDER_INPUT_METADATA.AMOUNT.id}
          placeholder={activeMode.title}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e, ActionType.Amount);
          }}
          errorText={errors.amount}
          isRupee
        />
        <SliderWithInput
          min={SLIDER_INPUT_METADATA.DURATION.min}
          max={SLIDER_INPUT_METADATA.DURATION.max}
          step={SLIDER_INPUT_METADATA.DURATION.step}
          label="Duration"
          id={SLIDER_INPUT_METADATA.DURATION.id}
          placeholder="Duration"
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e, ActionType.Duration);
          }}
          containerClassName="mt-6"
          errorText={errors.duration}
          isYear
        />
        <SliderWithInput
          min={SLIDER_INPUT_METADATA.INTEREST_RATE.min}
          max={SLIDER_INPUT_METADATA.INTEREST_RATE.max}
          step={SLIDER_INPUT_METADATA.INTEREST_RATE.step}
          label="Expected Interest Rate"
          id={SLIDER_INPUT_METADATA.INTEREST_RATE.id}
          placeholder="Annual Interest"
          value={interest}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e, ActionType.InterestRate);
          }}
          containerClassName="mt-6"
          errorText={errors.interestRate}
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
