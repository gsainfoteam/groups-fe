import Modal, { ModalProps } from "../modal";

import { BottomSheet, BottomSheetProps } from "react-spring-bottom-sheet";

interface ResponsiveModalProps {
  commonProps: {
    isOpen: boolean;
    onClose: () => void;
  };
  modalProps: Omit<ModalProps, "onClose">;
  bottomSheetProps: Omit<BottomSheetProps, "open" | "onDismiss">;
}

const ResponsiveModal = (props: ResponsiveModalProps) => {
  const { commonProps, modalProps, bottomSheetProps } = props;

  return (
    <>
      <div className="block md:hidden">
        <Modal {...modalProps} onClose={commonProps.onClose}>
          {modalProps.children}
        </Modal>
      </div>
      <div className="hidden md:block">
        <BottomSheet
          open={commonProps.isOpen}
          onDismiss={commonProps.onClose}
          {...bottomSheetProps}
        >
          {bottomSheetProps.children}
        </BottomSheet>
      </div>
    </>
  );
};

export default ResponsiveModal;
