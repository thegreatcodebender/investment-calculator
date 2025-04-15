import React, { useRef, useState } from "react";
import Card from "./Card";
import SliderWithInput from "./SliderWithInput";
import RadioGroup from "./RadioGroup";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
  INVESTMENT_NATURE_TOOLTIP,
} from "../constants/investment";
import InputField from "./InputField";
import { useInvestmentDispatch } from "../context/InvestmentContext";
import {
  INPUT_FIELD_METADATA,
  SLIDER_INPUT_METADATA,
} from "../constants/input";
import { INPUT_ERROR_MESSAGE } from "../constants/errors";
import { isValueInRange } from "../utils/validity";
import TabGroup from "./TabGroup";
import { ActionType } from "../types/investmentContext";
import { InputValueType } from "../types/inputField";
import { Errors } from "../types/errors";
import { CalculationCardProps } from "../types/card";
import { currencyWithComma } from "../utils/display";
import useIsMobile from "../hooks/useIsMobile";
import { useCalculationCardDispatch } from "../context/CalculationCardContext";
import { CalculationCardActionTypes } from "../types/calculationCardContext";
import { useCurrencyLocale } from "../context/CurrencyContext";

const CalculationCard = ({
  investmentState,
  cardRef,
}: CalculationCardProps) => {
  const [currencyLocale] = useCurrencyLocale();
  const isMobile = useIsMobile();
  const [errors, setErrors] = useState<Errors>({
    amount: "",
    duration: "",
    interest_rate: "",
    age: "",
    inflation: "",
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dispatchInvestment = useInvestmentDispatch();
  const amount = investmentState.amount;
  const duration = investmentState.duration;
  const interest = investmentState.interestRate;
  const investmentNature = investmentState.investmentNature;
  const age = investmentState.age;
  const investmentMode = investmentState.mode;
  const inflation = investmentState.inflation;

  const calculationCardDispatch = useCalculationCardDispatch();

  // Observer to check if the card is in view or not
  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (isMobile) {
          if (entry.isIntersecting)
            calculationCardDispatch({
              type: CalculationCardActionTypes.SET_VISIBILITY,
              payload: true,
            });
          else
            calculationCardDispatch({
              type: CalculationCardActionTypes.SET_VISIBILITY,
              payload: false,
            });
        }
      });
    },
    { threshold: 0.4 }
  );

  /**
   * Set the error for field name passed, as `true` if the validity is true and, `false` if otherwise
   * @param {ActionType} actionType - Action type enum value which includes the field name
   * @param {boolean} isValid - Boolean state of validity of the input field
   */
  const modifyError = (actionType: ActionType, isValid: boolean) => {
    const fieldName = actionType.split("SET_")[1];
    if (!fieldName) {
      throw new Error("Field name doesn't exist");
    }
    const fieldNameLowerCase = fieldName.toLowerCase();
    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        [fieldNameLowerCase]: INPUT_ERROR_MESSAGE[fieldName].rangeError,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [fieldNameLowerCase]: "",
      }));
    }
  };

  // To handle the input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    actionType: ActionType
  ) => {
    let isValid = true;
    const inputVal = e.target.value;
    const inputValFormatted = Number(inputVal.replace(/[^0-9.-]+/g, ""));

    switch (actionType) {
      case ActionType.Amount:
        isValid = isValueInRange(
          inputVal,
          SLIDER_INPUT_METADATA.AMOUNT.min,
          SLIDER_INPUT_METADATA.AMOUNT.max
        );
        break;
      case ActionType.Duration:
        isValid = isValueInRange(
          inputVal,
          SLIDER_INPUT_METADATA.DURATION.min,
          SLIDER_INPUT_METADATA.DURATION.max
        );
        break;
      case ActionType.InterestRate:
        isValid = isValueInRange(
          inputVal,
          SLIDER_INPUT_METADATA.INTEREST_RATE.min,
          SLIDER_INPUT_METADATA.INTEREST_RATE.max
        );
        break;
      case ActionType.Age:
        isValid = isValueInRange(
          inputVal,
          INPUT_FIELD_METADATA.AGE.min,
          INPUT_FIELD_METADATA.AGE.max
        );
        break;
      case ActionType.Inflation:
        isValid = isValueInRange(
          inputVal,
          INPUT_FIELD_METADATA.INFLATION.min,
          INPUT_FIELD_METADATA.INFLATION.max
        );
        break;
      default:
        break;
    }

    if (isValid) {
      dispatchInvestment({
        type: actionType,
        payload: {
          inputValue: inputVal,
          actualValue: inputValFormatted,
        },
      });
    } else {
      dispatchInvestment({
        type: actionType,
        payload: {
          inputValue:
            actionType === "SET_AGE" && inputVal.length === 0 ? -1 : inputVal,
        },
      });
    }
    // Age is optional, so no error should be shown when it is empty
    if (actionType === "SET_AGE" && inputVal.length === 0) {
      modifyError(actionType, true);
      return;
    }
    // Update the error
    modifyError(actionType, isValid);
  };

  return (
    <Card className="w-full min-lg:w-[60%]" cardRef={cardRef}>
      {/* Tab navigation */}
      <TabGroup
        data={INVESTMENT_MODES}
        activeTab={investmentMode.title}
        onClick={(modeObj) => {
          dispatchInvestment({
            type: ActionType.Mode,
            payload: modeObj,
          });
          // Reset the amount error since the mode change will replace the amount input value with the actual value
          modifyError(ActionType.Amount, true);
        }}
      />
      {/* Input fields */}
      <div
        className="mt-6"
        ref={(node) => {
          if (node && observerRef.current) {
            observerRef.current.observe(node);
          }
        }}
      >
        <SliderWithInput
          min={SLIDER_INPUT_METADATA.AMOUNT.min}
          max={SLIDER_INPUT_METADATA.AMOUNT.max}
          step={SLIDER_INPUT_METADATA.AMOUNT.step}
          label={SLIDER_INPUT_METADATA.AMOUNT.label[investmentMode.title]}
          tooltipText={
            SLIDER_INPUT_METADATA.AMOUNT.tooltip[investmentMode.title]
          }
          id={SLIDER_INPUT_METADATA.AMOUNT.id}
          placeholder={currencyWithComma({
            amount: SLIDER_INPUT_METADATA.AMOUNT.min,
            currencyLocale,
          })}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e, ActionType.Amount);
          }}
          errorText={errors.amount}
          inputClassName="w-[130px]"
          inputValueType={InputValueType.Currency}
        />
        <SliderWithInput
          min={SLIDER_INPUT_METADATA.DURATION.min}
          max={SLIDER_INPUT_METADATA.DURATION.max}
          step={SLIDER_INPUT_METADATA.DURATION.step}
          label={SLIDER_INPUT_METADATA.DURATION.label}
          tooltipText={SLIDER_INPUT_METADATA.DURATION.tooltip}
          id={SLIDER_INPUT_METADATA.DURATION.id}
          placeholder={SLIDER_INPUT_METADATA.DURATION.min.toString()}
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e, ActionType.Duration);
          }}
          containerClassName="mt-6"
          inputClassName="w-[110px]"
          errorText={errors.duration}
          inputValueType={InputValueType.Year}
        />
        <SliderWithInput
          min={SLIDER_INPUT_METADATA.INTEREST_RATE.min}
          max={SLIDER_INPUT_METADATA.INTEREST_RATE.max}
          step={SLIDER_INPUT_METADATA.INTEREST_RATE.step}
          label={SLIDER_INPUT_METADATA.INTEREST_RATE.label}
          tooltipText={SLIDER_INPUT_METADATA.INTEREST_RATE.tooltip}
          id={SLIDER_INPUT_METADATA.INTEREST_RATE.id}
          placeholder={SLIDER_INPUT_METADATA.INTEREST_RATE.min.toString()}
          value={interest}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e, ActionType.InterestRate);
          }}
          containerClassName="mt-6"
          inputClassName="w-24"
          errorText={errors.interest_rate}
          inputValueType={InputValueType.Percent}
        />
        <RadioGroup
          name="investment-nature"
          title="Contribution Type"
          selectedRadioLabel={investmentNature.actualValue}
          data={INVESTMENT_NATURE_LIST}
          tooltipText={INVESTMENT_NATURE_TOOLTIP}
          containerClassName="mt-6"
          onChange={(label: string) => {
            dispatchInvestment({
              type: ActionType.InvestmentNature,
              payload: label,
            });
          }}
        />
        <div className="min-sm:flex gap-14 mt-6">
          <InputField
            label={INPUT_FIELD_METADATA.AGE.label}
            tooltipText={INPUT_FIELD_METADATA.AGE.tooltip}
            id={INPUT_FIELD_METADATA.AGE.id}
            value={age}
            placeholder=""
            containerClassName="max-sm:mt-6"
            inputClassName="w-[64px]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e, ActionType.Age);
            }}
            errorText={errors.age}
            inputMode="numeric"
          />
          <InputField
            label={INPUT_FIELD_METADATA.INFLATION.label}
            tooltipText={INPUT_FIELD_METADATA.INFLATION.tooltip}
            id={INPUT_FIELD_METADATA.INFLATION.id}
            value={inflation}
            placeholder={INPUT_FIELD_METADATA.INFLATION.min.toString()}
            containerClassName="max-sm:mt-6"
            inputClassName="w-[98px]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e, ActionType.Inflation);
            }}
            inputValueType={InputValueType.Percent}
            errorText={errors.inflation}
          />
        </div>
      </div>
    </Card>
  );
};

export default CalculationCard;
