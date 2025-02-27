import { PropsWithChildren } from "react";
import { CardProps } from "../types/card";

const Card = ({
  bgColor,
  className,
  children,
  cardRef,
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-white"} ${
        className ? className : ""
      } shadow-card p-6 rounded-2xl border-[rgba(13,122,72,0.01)]`}
      ref={cardRef}
    >
      {children}
    </div>
  );
};

export default Card;
