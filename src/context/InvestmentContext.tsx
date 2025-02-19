import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  INVESTMENT_INITIAL_STATE,
  INVESTMENT_MODES,
} from "../constants/investment";
import { Action, ActionType, State } from "../types/investmentContext";

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
      const { title, shortName, defaultAmount }: State["mode"] = action.payload;
      return {
        ...state,
        mode: { title, shortName, defaultAmount },
        amount: {
          inputValue:
            existingPrevModeAmount !== -1
              ? existingPrevModeAmount
              : action.payload.defaultAmount,
          actualValue:
            existingPrevModeAmount !== -1
              ? existingPrevModeAmount
              : action.payload.defaultAmount,
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
  const [state, dispatch] = useReducer(investmentReducer, initialState);
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
