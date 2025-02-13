import { useEffect, useState } from "react";
import { MOBILE_SCREEN_WIDTH } from "../constants/screen";
import useDebounce from "./useDebounce";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth < MOBILE_SCREEN_WIDTH);
  };
  const debouncedCheckScreenWidth = useDebounce(checkScreenWidth);

  useEffect(() => {
    debouncedCheckScreenWidth();
    window.addEventListener("resize", debouncedCheckScreenWidth);
    return () =>
      window.removeEventListener("resize", debouncedCheckScreenWidth);
  }, [debouncedCheckScreenWidth]);
  return isMobile;
};

export default useIsMobile;
