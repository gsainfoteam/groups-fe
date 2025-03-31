import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Button from "../button/Button";

import Modal from ".";

export default {
  title: "components/Modal",
  component: Modal,
  argTypes: {
    isWithDefaultFrame: {
      options: [true, false],
      control: { type: "boolean" },
      defaultValue: true,
    },
  },
} as Meta<typeof Modal>;

const ModalContent = () => (
  <>
    <h2 id="modal-title" className="text-xl font-bold mb-2">
      모달 제목
    </h2>
    <p>이것은 모달 내용입니다. 여기에 모달 콘텐츠가 표시됩니다.</p>
  </>
);

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        모달 열기
      </Button>
      {isOpen && (
        <Modal {...args} onClose={handleClose}>
          <ModalContent />
        </Modal>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isWithDefaultFrame: true,
};

export const WithoutDefaultFrame = Template.bind({});
WithoutDefaultFrame.args = {
  isWithDefaultFrame: false,
};
