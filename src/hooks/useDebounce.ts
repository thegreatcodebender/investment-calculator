import { useCallback, useRef } from "react";

const useDebounce = (callback: (...args: unknown[]) => void, delay = 250) => {
  const timeoutId = useRef<NodeJS.Timeout>();

  const debouncedFn = useCallback(
    (...args: unknown[]) => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(timeoutId.current);
    },
    [callback, delay]
  );

  return debouncedFn;
};

export default useDebounce;
