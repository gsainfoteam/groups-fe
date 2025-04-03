import { Xmark } from "iconoir-react";
import { PropsWithChildren, forwardRef, ForwardedRef } from "react";

import Button from "../button/Button";

interface DefaultBottomSheetProps extends PropsWithChildren {
  onClose: () => void;
}

const DefaultBottomSheet = forwardRef(
  (
    { children, onClose }: DefaultBottomSheetProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className="w-full px-6 pb-6 box-border">
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

DefaultBottomSheet.displayName = "DefaultBottomSheet";

export default DefaultBottomSheet;
