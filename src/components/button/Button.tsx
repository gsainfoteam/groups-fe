import { cn } from "@/utils/clsx";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const ButtonVariants = cva("font-semibold transition", {
  variants: {
    variant: {
      default: [],
      outlined: ["border border-primary text-primary", "hover:bg-secondary"],
      contained: ["bg-primary text-white", "hover:brightness-90"],
      disabled: ["bg-greyLight text-grey"],
      enabled: [
        "border border-greyBorder bg-greyLight text-dark",
        "dark:border-grey dark:text-d_white",
      ],
    },
    size: {
      default: [],
      small: ["px-[15px] py-[7px] rounded-[5px]"],
      big: ["px-[25px] py-[10px] rounded-[5px]"],
      cta: ["px-[30px] py-[15px] rounded-[10px]"],
    },
    animated: {
      default: [],
      true: ["active:scale-95"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    animated: "default",
  },
});

interface ButtonProps
  extends VariantProps<typeof ButtonVariants>,
    PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  variant,
  size,
  animated,

  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(ButtonVariants({ variant, size, animated }), className)}
      {...props}
      disabled={variant === "disabled"}
    >
      {children}
    </button>
  );
};

export default Button;
