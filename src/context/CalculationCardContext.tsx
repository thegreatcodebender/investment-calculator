import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  CalculationCard,
  CalculationCardAction,
  CalculationCardActionTypes,
} from "../types/calculationCardContext";

const initialState: CalculationCard = { isCalculationCardVisible: null };

const calculationCardReducer = (
  state = initialState,
  action: CalculationCardAction
) => {
  switch (action.type) {
    case CalculationCardActionTypes.SET_VISIBILITY:
      return { ...state, isCalculationCardVisible: action.payload };

    default:
      throw new Error("No such action type is defined: " + action.type);
  }
};

const StateContext = createContext<CalculationCard | undefined>(undefined);
const DispatchContext = createContext<
  React.Dispatch<CalculationCardAction> | undefined
>(undefined);

export const CalculationCardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(calculationCardReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useCalculationCardState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("Provided summary card context is undefined");
  }
  return context;
};

export const useCalculationCardDispatch =
  (): React.Dispatch<CalculationCardAction> => {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      throw new Error("Provided dispatch context is undefined");
    }
    return context;
  };
