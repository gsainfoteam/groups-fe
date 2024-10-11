import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Check from "@/assets/icons/check.svg?react";
import useClickOutside from "@/hooks/useClickOutside";
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

const IconVariants = cva("stroke-dark", {
  variants: {
    size: { small: ["w-5 h-5"], big: ["w-6 h-6"] },
  },
  defaultVariants: {
    size: "big",
  },
});

const OptionVariants = cva(
  "flex hover:bg-secondary cursor-pointer items-center",
  {
    variants: {
      size: {
        small: ["pl-3 pr-2.5 py-[5px]"],
        big: ["pl-4 pr-2.5 py-2.5 h-12"],
      },
    },
    defaultVariants: {
      size: "big",
    },
  },
);

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
  withDefaultValue,

  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDismiss = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLUListElement>(onDismiss);

  return (
    <div
      className={cn(
        SelectVariants({
          size: size,
        }),
        className,
      )}
      onClickCapture={() => {
        setIsOpen(true);
      }}
    >
      <div
        className={cn(
          "grow text-primary text-base font-medium",
          withDefaultValue && selectedValue === options[0] && "text-greyDark",
        )}
      >
        {selectedValue}
      </div>
      <ArrowRight className={cn(IconVariants({ size }), "rotate-90")} />

      {isOpen && (
        <ul
          ref={ref}
          className="absolute top-0 left-0 w-full border-greyBorder border-[1.5px] bg-white rounded-[10px] overflow-hidden"
        >
          {options.map((optionValue, index) => (
            <li
              key={optionValue}
              className={cn(OptionVariants({ size }), [
                withDefaultValue && index === 0 && "text-greyDark",
                selectedValue === optionValue && "text-primary",
              ])}
              onClickCapture={() => {
                onOptionClick?.(optionValue);
                setIsOpen(false);
              }}
            >
              <p className="grow text-base">{optionValue}</p>

              {selectedValue === optionValue && (
                <Check
                  className={cn(IconVariants({ size }), "stroke-primary")}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;