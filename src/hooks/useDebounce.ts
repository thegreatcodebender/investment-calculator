// hooks/useDebounce.ts
import { useCallback } from "react";

const useDebounce = (callback: (...args: any[]) => void, delay = 250) => {
  let timeoutId: number;

  const debouncedFn = useCallback(
    (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);

      return () => clearTimeout(timeoutId);
    },
    [callback, delay]
  );

  return debouncedFn;
};

export default useDebounce;
