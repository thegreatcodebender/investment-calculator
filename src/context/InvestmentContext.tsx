import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  DEFAULT_INFLATION_RATES,
  DEFAULT_INVESTMENT_AMOUNT,
  INVESTMENT_INITIAL_STATE,
  INVESTMENT_MODES,
} from "../constants/investment";
import { Action, ActionType, State } from "../types/investmentContext";
import { CurrencyLocales } from "../types/currencyContext";
import { SLIDER_INPUT_METADATA } from "../constants/input";
import { useCurrencyLocale } from "./CurrencyContext";

const initialState: State = {
  amount: {
    inputValue: INVESTMENT_INITIAL_STATE.AMOUNT,
    actualValue: INVESTMENT_INITIAL_STATE.AMOUNT,
    prevModeAmount: INVESTMENT_MODES[1].defaultAmount,
  },
  duration: {
    inputValue: INVESTMENT_INITIAL_STATE.DURATION,
    actualValue: INVESTMENT_INITIAL_STATE.DURATION,
    prevModeDuration: INVESTMENT_INITIAL_STATE.DURATION,
  },
  interestRate: {
    inputValue: INVESTMENT_INITIAL_STATE.INTEREST_RATE,
    actualValue: INVESTMENT_INITIAL_STATE.INTEREST_RATE,
    prevModeInterestRate: INVESTMENT_INITIAL_STATE.INTEREST_RATE,
  },
  investmentNature: {
    actualValue: INVESTMENT_INITIAL_STATE.INVESTMENT_NATURE,
    prevModeInvestmentNature: INVESTMENT_INITIAL_STATE.INVESTMENT_NATURE,
  },
  age: {
    inputValue: INVESTMENT_INITIAL_STATE.AGE,
    actualValue: INVESTMENT_INITIAL_STATE.AGE,
  },
  mode: INVESTMENT_INITIAL_STATE.MODE,
  inflation: {
    inputValue: INVESTMENT_INITIAL_STATE.INFLATION,
    actualValue: INVESTMENT_INITIAL_STATE.INFLATION,
  },
};

const investmentReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Amount: {
      if (!action.payload.actualValue) {
        return {
          ...state,
          amount: {
            ...state.amount,
            inputValue: action.payload.inputValue,
            prevModeAmount: state.amount.prevModeAmount,
          },
        };
      }
      return {
        ...state,
        amount: {
          ...action.payload,
          prevModeAmount: state.amount.prevModeAmount,
        },
      };
    }
    case ActionType.Duration: {
      if (!action.payload.actualValue) {
        return {
          ...state,
          duration: {
            ...state.duration,
            inputValue: action.payload.inputValue,
            prevModeDuration: state.duration.prevModeDuration,
          },
        };
      }
      return {
        ...state,
        duration: {
          ...action.payload,
          prevModeDuration: state.duration.prevModeDuration,
        },
      };
    }
    case ActionType.InterestRate: {
      if (!action.payload.actualValue) {
        return {
          ...state,
          interestRate: {
            ...state.interestRate,
            inputValue: action.payload.inputValue,
            prevModeInterestRate: state.interestRate.prevModeInterestRate,
          },
        };
      }
      return {
        ...state,
        interestRate: {
          ...action.payload,
          prevModeInterestRate: state.interestRate.prevModeInterestRate,
        },
      };
    }
    case ActionType.InvestmentNature: {
      return {
        ...state,
        investmentNature: {
          actualValue: action.payload,
          prevModeInvestmentNature: state.investmentNature.actualValue,
        },
      };
    }
    case ActionType.Age: {
      if (!action.payload.actualValue) {
        if (action.payload.inputValue === -1) {
          return {
            ...state,
            age: {
              ...state.age,
              inputValue: action.payload.inputValue,
              actualValue: action.payload.inputValue,
            },
          };
        }
        return {
          ...state,
          age: { ...state.age, inputValue: action.payload.inputValue },
        };
      }
      return { ...state, age: action.payload };
    }
    case ActionType.Mode: {
      if (action.payload.title === state.mode.title) {
        return state;
      }
      const existingPrevModeAmount = state.amount.prevModeAmount; // To get the existing prev mode amount for data persistence between modes
      const existingPrevModeDuration = state.duration.prevModeDuration;
      const existingPrevModeInterestRate =
        state.interestRate.prevModeInterestRate;
      const existingPrevModeInvestmentNature =
        state.investmentNature.prevModeInvestmentNature;
      const newPrevModeAmount =
        action.payload.prevModeAmount ?? state.amount.actualValue; // Get new prev mode value to be updated into the state
      const newPrevModeDuration =
        action.payload.prevModeDuration ?? state.duration.actualValue;
      const newPrevModeInterestRate =
        action.payload.prevModeInterestRate ?? state.interestRate.actualValue;
      const newPrevModeInvestmentNature =
        action.payload.prevModeInvestmentNature ??
        state.investmentNature.actualValue;
      const { title, shortName, currencyLocale }: State["mode"] =
        action.payload;
      const defaultAmount =
        DEFAULT_INVESTMENT_AMOUNT.find(
          (investMode) => investMode.shortName === shortName
        )?.defaultValues[currencyLocale ?? CurrencyLocales.IN] ?? 1;
      let updatedAmountValue = defaultAmount;
      if (
        existingPrevModeAmount !== -1 &&
        existingPrevModeAmount <
          SLIDER_INPUT_METADATA.AMOUNT.max(currencyLocale ?? CurrencyLocales.IN)
      ) {
        updatedAmountValue = existingPrevModeAmount;
      }

      return {
        ...state,
        mode: { title, shortName, defaultAmount },
        amount: {
          inputValue: updatedAmountValue,
          actualValue: updatedAmountValue,
          prevModeAmount: newPrevModeAmount,
        },
        duration: {
          inputValue: existingPrevModeDuration,
          actualValue: existingPrevModeDuration,
          prevModeDuration: newPrevModeDuration,
        },
        interestRate: {
          inputValue: existingPrevModeInterestRate,
          actualValue: existingPrevModeInterestRate,
          prevModeInterestRate: newPrevModeInterestRate,
        },
        investmentNature: {
          actualValue: existingPrevModeInvestmentNature,
          prevModeInvestmentNature: newPrevModeInvestmentNature,
        },
      };
    }
    case ActionType.Inflation: {
      if (!action.payload.actualValue) {
        return {
          ...state,
          inflation: {
            ...state.inflation,
            inputValue: action.payload.inputValue,
          },
        };
      }
      return { ...state, inflation: action.payload };
    }
    case ActionType.LocaleAmountInflation: {
      if (!action.payload.currencyLocale) {
        return state;
      }
      const investmentModeShortName: string = action.payload.modeShortName;
      const currencyLocale: CurrencyLocales = action.payload.currencyLocale;
      const currentAmount = state.amount.actualValue;
      const existingPrevModeAmount = state.amount.prevModeAmount; // To get the existing prev mode amount for data persistence between modes

      // Get current locale default values
      const currentLocaleModeDefaultAmount = DEFAULT_INVESTMENT_AMOUNT.find(
        (investMode) => investMode.shortName === investmentModeShortName
      )?.defaultValues[
        currencyLocale === CurrencyLocales.IN
          ? CurrencyLocales.US
          : CurrencyLocales.IN
      ];
      const currentLocaleNextModeDefaultAmount = DEFAULT_INVESTMENT_AMOUNT.find(
        (investMode) => investMode.shortName !== investmentModeShortName
      )?.defaultValues[
        currencyLocale === CurrencyLocales.IN
          ? CurrencyLocales.US
          : CurrencyLocales.IN
      ];

      // Get new locale default values
      const currentModeDefaultAmount =
        DEFAULT_INVESTMENT_AMOUNT.find(
          (investMode) => investMode.shortName === investmentModeShortName
        )?.defaultValues[currencyLocale ?? CurrencyLocales.IN] ?? 1;
      const nextModeDefaultAmount =
        DEFAULT_INVESTMENT_AMOUNT.find(
          (investMode) => investMode.shortName !== investmentModeShortName
        )?.defaultValues[currencyLocale ?? CurrencyLocales.IN] ?? 1;

      // Set current investment mode amount value of new locale
      let updatedAmountValue = currentModeDefaultAmount;
      if (
        currentAmount !== -1 &&
        currentAmount !== currentLocaleModeDefaultAmount &&
        currentAmount < SLIDER_INPUT_METADATA.AMOUNT.max(currencyLocale)
      ) {
        updatedAmountValue = currentAmount;
      }

      // Set next investment mode amount value of new locale
      let updatedPrevAmountValue = nextModeDefaultAmount;
      if (
        existingPrevModeAmount !== -1 &&
        existingPrevModeAmount !== currentLocaleNextModeDefaultAmount &&
        existingPrevModeAmount <
          SLIDER_INPUT_METADATA.AMOUNT.max(currencyLocale)
      ) {
        updatedPrevAmountValue = existingPrevModeAmount;
      }

      return {
        ...state,
        amount: {
          inputValue: updatedAmountValue,
          actualValue: updatedAmountValue,
          prevModeAmount: updatedPrevAmountValue,
        },
        inflation: {
          inputValue: DEFAULT_INFLATION_RATES[currencyLocale],
          actualValue: DEFAULT_INFLATION_RATES[currencyLocale],
        },
      };
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

export const InvestmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currencyLocale] = useCurrencyLocale();
  // Update initial state to adapt to the currency locale
  const initialStateWithLocale = {
    ...initialState,
    amount: {
      inputValue: DEFAULT_INVESTMENT_AMOUNT[0].defaultValues[currencyLocale],
      actualValue: DEFAULT_INVESTMENT_AMOUNT[0].defaultValues[currencyLocale],
      prevModeAmount:
        DEFAULT_INVESTMENT_AMOUNT[1].defaultValues[currencyLocale],
    },
    inflation: {
      inputValue: DEFAULT_INFLATION_RATES[currencyLocale],
      actualValue: DEFAULT_INFLATION_RATES[currencyLocale],
    },
  };
  const [state, dispatch] = useReducer(
    investmentReducer,
    initialStateWithLocale
  );
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useInvestmentState = (): State => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("Provided investment context is undefined");
  }
  return context;
};

export const useInvestmentDispatch = (): React.Dispatch<Action> => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("Provided dispatch context is undefined");
  }
  return context;
};
