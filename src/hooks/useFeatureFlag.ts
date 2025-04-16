import { FEATURE_FLAGS } from "../constants/featureFlags";

/** Check if feature is enabled */
export const useFeatureFlag = (featureFlag: string) => {
  if (FEATURE_FLAGS[featureFlag] === undefined) {
    throw new Error(`Unknown feature flag: ${featureFlag}`);
  }
  return FEATURE_FLAGS[featureFlag];
};
