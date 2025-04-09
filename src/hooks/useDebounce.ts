import { useCallback, useRef } from "react";

const useDebounce = (callback: (...args: unknown[]) => void, delay = 250) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: unknown[]) => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => callback(...args), delay);
      return () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
      };
    },
    [callback, delay]
  );

  return debouncedFn;
};

export default useDebounce;
