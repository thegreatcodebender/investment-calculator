import RupeesIcon from "../assets/images/rupee.svg";
interface IconProps {
  className?: string;
}

export const RupeeIcon = ({ className }: IconProps) => {
  return <img src={RupeesIcon} alt="Rupee" className={className} />;
};
