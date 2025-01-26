import { PropsWithChildren } from "react";

interface CardProps {
  bgColor?: string;
  className?: string;
}

const Card = ({
  bgColor,
  className,
  children,
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-white"} ${
        className ? className : ""
      } shadow-card p-6 rounded-2xl border-[rgba(13,122,72,0.01)]`}
    >
      {children}
    </div>
  );
};

export default Card;
