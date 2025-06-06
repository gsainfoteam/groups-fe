import { ComponentProps, forwardRef } from "react";
import Button from "../button/Button";

interface InputProps extends ComponentProps<"input"> {
  buttonValue?: string;
  onButtonClick?: () => void;
  title?: string;
  errorText?: string;
}

const Input = forwardRef(
  (
    {
      width,
      buttonValue,
      onButtonClick,
      title,
      errorText,
      disabled,
      ...rest
    }: InputProps,
    ref?: React.ForwardedRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <div style={{ width }}>
        {title && <h6 className="mb-[10px] text-base font-medium">{title}</h6>}

        <div className="relative flex h-[48px] w-full gap-[10px]">
          <input
            ref={ref}
            {...rest}
            aria-label={title}
            disabled={disabled}
            className={[
              "grow rounded-[10px] border-[1.5px] border-solid py-1 pl-4 pr-[10px] bg-white",
              disabled ? "border-grey" : "border-primary",
              rest.className,
            ].join(" ")}
          />

          {buttonValue && (
            <Button
              variant={disabled ? "disabled" : "emphasized"}
              onClick={onButtonClick}
              size="big"
              className="px-[20px] rounded-[10px]"
              disabled={disabled}
            >
              {buttonValue}
            </Button>
          )}

          {errorText && (
            <p
              style={{ width }}
              className="absolute top-[58px] text-sm text-primary"
            >
              {errorText}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "input";

export default Input;
