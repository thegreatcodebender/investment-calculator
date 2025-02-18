import RupeesIcon from "../assets/images/rupee.svg";
import { IconProps } from "../types/icon";

export const RupeeIcon = ({ className }: IconProps) => {
  return <img src={RupeesIcon} alt="Rupee" className={className} />;
};
