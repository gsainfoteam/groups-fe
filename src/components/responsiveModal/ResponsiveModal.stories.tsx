import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Button from "../button/Button";
import ResponsiveModal from ".";

export default {
  title: "components/ResponsiveModal",
  component: ResponsiveModal,
  argTypes: {
    modalProps: {
      control: "object",
      defaultValue: {
        isWithDefaultFrame: true,
      },
    },
    bottomSheetProps: {
      control: "object",
      defaultValue: {
        snapPoints: ({ maxHeight }: { maxHeight: number }) => [maxHeight * 0.8],
      },
    },
  },
} as Meta<typeof ResponsiveModal>;

const ModalContent = () => (
  <>
    <h2 id="modal-title" className="text-xl font-bold mb-2">
      반응형 모달 제목
    </h2>
    <p>
      이것은 반응형 모달 내용입니다. 모바일에서는 바텀시트로, 데스크톱에서는
      모달로 표시됩니다.
    </p>
  </>
);

const Template: StoryFn<typeof ResponsiveModal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        반응형 모달 열기
      </Button>
      <ResponsiveModal
        commonProps={{
          isOpen,
          onClose: handleClose,
        }}
        modalProps={args.modalProps}
        bottomSheetProps={args.bottomSheetProps}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  modalProps: {
    isWithDefaultFrame: true,
    children: <ModalContent />,
  },
  bottomSheetProps: {
    snapPoints: ({ maxHeight }: { maxHeight: number }) => [maxHeight * 0.8],
    children: <ModalContent />,
  },
};

export const WithoutDefaultFrame = Template.bind({});
WithoutDefaultFrame.args = {
  modalProps: {
    isWithDefaultFrame: false,
    children: <ModalContent />,
  },
  bottomSheetProps: {
    snapPoints: ({ maxHeight }: { maxHeight: number }) => [maxHeight * 0.8],
    children: <ModalContent />,
  },
};
