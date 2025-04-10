export interface CalculationCard {
  isCalculationCardVisible: null | boolean;
}

export enum CalculationCardActionTypes {
  SET_VISIBILITY = "SET_VISIBILITY",
}

export interface CalculationCardAction {
  type: CalculationCardActionTypes;
  payload: boolean;
}
