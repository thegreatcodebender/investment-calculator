import { PropsWithChildren } from "react";
import { CardProps } from "../types/card";

const Card = ({
  bgColor,
  className,
  children,
  cardRef,
  ariaHidden = false,
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-white"} ${
        className ? className : ""
      } shadow-card p-6 max-[340px]:p-4 rounded-2xl border-[rgba(13,122,72,0.01)]`}
      ref={cardRef}
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  );
};

export default Card;
