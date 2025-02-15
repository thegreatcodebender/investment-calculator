import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";

export interface InputAndActualValue {
  inputValue: number | string;
  actualValue: number;
  prevModeAmount?: number;
}

interface State {
  amount: InputAndActualValue;
  duration: InputAndActualValue;
  interestRate: InputAndActualValue;
  investmentNature: string;
  age: InputAndActualValue;
  mode: { title: string; shortName: string; defaultAmount: number };
}

interface Action {
  type: ActionType;
  payload: any;
}

export enum ActionType {
  Amount = "SET_AMOUNT",
  Duration = "SET_DURATION",
  InterestRate = "SET_INTEREST_RATE",
  InvestmentNature = "SET_INVESTMENT_NATURE",
  Age = "SET_AGE",
  Mode = "SET_MODE",
}

const initialState: State = {
  amount: { inputValue: 1500000, actualValue: 1500000, prevModeAmount: -1 },
  duration: { inputValue: 8, actualValue: 8 },
  interestRate: { inputValue: 10, actualValue: 10 },
  investmentNature: INVESTMENT_NATURE_LIST[0].title,
  age: { inputValue: -1, actualValue: -1 },
  mode: INVESTMENT_MODES[0],
};

const investmentReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Amount:
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
    case ActionType.Duration:
      if (!action.payload.actualValue) {
        return {
          ...state,
          duration: {
            ...state.duration,
            inputValue: action.payload.inputValue,
          },
        };
      }
      return { ...state, duration: action.payload };
    case ActionType.InterestRate:
      if (!action.payload.actualValue) {
        return {
          ...state,
          interestRate: {
            ...state.interestRate,
            inputValue: action.payload.inputValue,
          },
        };
      }
      return { ...state, interestRate: action.payload };
    case ActionType.InvestmentNature:
      return { ...state, investmentNature: action.payload };
    case ActionType.Age:
      if (!action.payload.actualValue) {
        return {
          ...state,
          age: { ...state.age, inputValue: action.payload.inputValue },
        };
      }
      return { ...state, age: action.payload };
    case ActionType.Mode:
      const existingPrevModeAmount = state.amount.prevModeAmount; // To get the existing prev mode amount for data persistence between modes
      const newPrevModeAmount =
        action.payload.prevModeAmount ?? state.amount.actualValue; // Get new prev mode value to be updated into the state
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
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
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
