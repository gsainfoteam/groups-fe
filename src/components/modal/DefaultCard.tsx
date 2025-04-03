import { Xmark } from "iconoir-react";
import { PropsWithChildren, forwardRef, ForwardedRef } from "react";
import { ModalProps } from ".";
import Button from "../button/Button";

const DefaultCard = forwardRef(
  (
    { children, onClose }: PropsWithChildren & Pick<ModalProps, "onClose">,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className="bg-white w-[400px] p-6 rounded-2xl box-border">
        <div className="w-full flex justify-end mb-2">
          <Button onClick={onClose}>
            <Xmark className="w-6 h-6 text-dark" />
          </Button>
        </div>

        {children}
      </div>
    );
  },
);

DefaultCard.displayName = "DefaultCard";

export default DefaultCard;
