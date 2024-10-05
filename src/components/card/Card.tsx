import { cn } from "@/utils/clsx";
import { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: ClassValue;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-greyLight px-5 py-[15px] text-base text-greyDark",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
