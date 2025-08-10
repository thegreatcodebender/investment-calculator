import { useMemo } from "react";

const getAppleDeviceType = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Check for specific iOS devices
  if (/iPhone/.test(userAgent)) return "iPhone";
  if (/iPod/.test(userAgent)) return "iPod";

  // Check for iPad (including modern iPads that might report as Mac)
  if (
    /iPad/.test(userAgent) ||
    (navigator?.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "iPad";
  }

  // Check for Mac computers
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) return "Mac";

  return null; // Not an Apple device
};

const useIsAppleDevice = () => {
  const appleDeviceType = useMemo(getAppleDeviceType, []);
  return !!appleDeviceType;
};

export default useIsAppleDevice;
