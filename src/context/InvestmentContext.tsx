import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  INVESTMENT_MODES,
  INVESTMENT_NATURE_LIST,
} from "../constants/investment";

interface State {
  amount: number;
  duration: number;
  interestRate: number;
  investmentNature: string;
  age: number;
  mode: { title: string; shortName: string; defaultAmount: number };
}

interface Action {
  type: ActionType;
  payload: any;
}

export enum ActionType {
  Amount = "SET_TARGET_AMOUNT",
  Duration = "SET_DURATION",
  InterestRate = "SET_INTEREST_RATE",
  InvestmentNature = "SET_INVESTMENT_NATURE",
  Age = "SET_AGE",
  Mode = "SET_MODE",
}

const initialState = {
  amount: 1500000,
  duration: 8,
  interestRate: 10,
  investmentNature: INVESTMENT_NATURE_LIST[0].title,
  age: -1,
  mode: INVESTMENT_MODES[0],
};

const investmentReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.Amount:
      return { ...state, amount: action.payload };
    case ActionType.Duration:
      return { ...state, duration: action.payload };
    case ActionType.InterestRate:
      return { ...state, interestRate: action.payload };
    case ActionType.InvestmentNature:
      return { ...state, investmentNature: action.payload };
    case ActionType.Age:
      return { ...state, age: action.payload };
    case ActionType.Mode:
      return {
        ...state,
        mode: action.payload,
        amount: action.payload.defaultAmount,
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
