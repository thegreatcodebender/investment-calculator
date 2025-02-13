import React, { useState } from "react";
import Card from "./Card";
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
import {
  INPUT_FIELD_METADATA,
  SLIDER_INPUT_METADATA,
} from "../constants/input";
import { INPUT_ERROR_MESSAGE } from "../constants/errors";
import { isValueInRange } from "../utils/validity";
import TabGroup from "./TabGroup";

const CalculationCard = () => {
  const [errors, setErrors] = useState({
    amount: "",
    duration: "",
    interestRate: "",
    age: "",
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
        isValid = isValueInRange(
          inputValFormatted,
          SLIDER_INPUT_METADATA.AMOUNT.min,
          SLIDER_INPUT_METADATA.AMOUNT.max
        );
        if (!isValid) {
          setErrors((prev) => ({
            ...prev,
            amount: INPUT_ERROR_MESSAGE.AMOUNT.rangeError,
          }));
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            amount: "",
          }));
        }
        break;
      case ActionType.Duration:
        isValid = isValueInRange(
          inputValFormatted,
          SLIDER_INPUT_METADATA.DURATION.min,
          SLIDER_INPUT_METADATA.DURATION.max
        );
        if (!isValid) {
          setErrors((prev) => ({
            ...prev,
            duration: INPUT_ERROR_MESSAGE.DURATION.rangeError,
          }));
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            duration: "",
          }));
        }
        break;
      case ActionType.InterestRate:
        isValid = isValueInRange(
          inputValFormatted,
          SLIDER_INPUT_METADATA.INTEREST_RATE.min,
          SLIDER_INPUT_METADATA.INTEREST_RATE.max
        );
        if (!isValid) {
          setErrors((prev) => ({
            ...prev,
            interestRate: INPUT_ERROR_MESSAGE.INTEREST_RATE.rangeError,
          }));
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            interestRate: "",
          }));
        }
        break;
      case ActionType.Age:
        isValid = isValueInRange(
          inputValFormatted,
          INPUT_FIELD_METADATA.AGE.min,
          INPUT_FIELD_METADATA.AGE.max
        );
        if (!isValid) {
          setErrors((prev) => ({
            ...prev,
            age: INPUT_ERROR_MESSAGE.AGE.rangeError,
          }));
          return;
        } else {
          setErrors((prev) => ({
            ...prev,
            age: "",
          }));
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
      <TabGroup
        data={INVESTMENT_MODES}
        activeTab={activeMode.title}
        onClick={(payload) =>
          dispatchInvestment({
            type: ActionType.Mode,
            payload,
          })
        }
      />
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
            id={INPUT_FIELD_METADATA.AGE.id}
            value={age !== -1 ? age : ""}
            placeholder=""
            containerClassName="max-sm:mt-6"
            inputClassName="w-[64px]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e, ActionType.Age);
            }}
            errorText={errors.age}
          />
        </div>
      </div>
    </Card>
  );
};

export default CalculationCard;
