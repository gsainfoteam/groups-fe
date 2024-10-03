import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {}

const Card = ({ children }: CardProps) => {
  return (
    <p
      className={
        "my-6 w-full rounded-2xl bg-greyLight px-5 py-[15px] text-lg text-greyDark"
      }
    >
      {children}
    </p>
  );
};

export default Card;
