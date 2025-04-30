import { PropsWithChildren } from "react";
import { cn } from "@/utils/clsx";

interface ModalBackgroundProps extends PropsWithChildren {
  isVisible?: boolean;
  isWithAnimation?: boolean;
}

const ModalBackground = ({
  children,
  isVisible = true,
  isWithAnimation = true,
}: ModalBackgroundProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50",
        isWithAnimation && "transition-all duration-300",
        isWithAnimation && isVisible
          ? "bg-black bg-opacity-50"
          : isWithAnimation
            ? "bg-black bg-opacity-0"
            : "bg-black bg-opacity-50",
      )}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
