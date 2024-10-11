import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import { cn } from "@/utils/clsx";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { useState } from "react";

const SelectVariants = cva(
  "bg-greyLight flex justify-start items-center cursor-pointer relative",
  {
    variants: {
      size: {
        small: ["pl-3 pr-2.5 py-[5px]", "rounded-[5px]"],
        big: ["pl-4 pr-2.5 py-2.5 h-12", "rounded-[10px]"],
      },
    },
    defaultVariants: {
      size: "big",
    },
  },
);

const IconVariants = cva("stroke-dark rotate-90", {
  variants: {
    size: { small: ["w-5 h-5"], big: ["w-6 h-6"] },
  },
});

const OptionVariants = cva("");

interface SelectProps extends VariantProps<typeof SelectVariants> {
  options: string[];
  selectedValue: string;
  onOptionClick?: (value: string) => void;
  withDefaultValue?: boolean;

  className?: ClassValue;
}

const Select = ({
  size,
  options,
  selectedValue,
  onOptionClick,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        SelectVariants({
          size: size,
        }),
      )}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <div className="grow text-greyDark text-base font-medium">
        {selectedValue}
      </div>
      <ArrowRight className={cn(IconVariants({ size }))} />

      {isOpen && (
        <ul className="absolute top-0 left-0 w-full border-greyBorder border-[1.5px] bg-white rounded-[10px] overflow-hidden">
          {options.map((optionValue) => (
            <li
              key={optionValue}
              className="pl-4 pr-2.5 py-2.5 h-12 flex hover:bg-secondary cursor-pointer"
              onClick={() => {
                onOptionClick?.(optionValue);
                setIsOpen(false);
              }}
            >
              <p className="grow">{optionValue}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
