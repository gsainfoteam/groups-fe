import Modal, { ModalProps } from "../modal";
import "react-spring-bottom-sheet/dist/style.css";
import { BottomSheet, BottomSheetProps } from "react-spring-bottom-sheet";
import useIsMobile from "@/hooks/useIsMobile";
import DefaultBottomSheet from "./DefaultBottomSheet";

interface ResponsiveModalProps {
  commonProps: {
    isOpen: boolean;
    onClose: () => void;
  };
  modalProps: Omit<ModalProps, "onClose">;
  bottomSheetProps: Omit<BottomSheetProps, "open" | "onDismiss"> & {
    isWithDefaultFrame?: boolean;
  };
}

const ResponsiveModal = (props: ResponsiveModalProps) => {
  const {
    commonProps,
    modalProps,
    bottomSheetProps: {
      isWithDefaultFrame: isBottomSheetWithDefaultFrame = true,
      ...bottomSheetProps
    },
  } = props;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <BottomSheet
        open={commonProps.isOpen}
        onDismiss={commonProps.onClose}
        {...bottomSheetProps}
      >
        {isBottomSheetWithDefaultFrame ? (
          <DefaultBottomSheet onClose={commonProps.onClose}>
            {bottomSheetProps.children}
          </DefaultBottomSheet>
        ) : (
          bottomSheetProps.children
        )}
      </BottomSheet>
    );
  }

  return commonProps.isOpen ? (
    <Modal
      {...modalProps}
      onClose={commonProps.onClose}
      isOpen={commonProps.isOpen}
    >
      {modalProps.children}
    </Modal>
  ) : null;
};

export default ResponsiveModal;
