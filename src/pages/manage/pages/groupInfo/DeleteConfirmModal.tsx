import React from "react";
import Button from "@/components/button/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-red-600 text-lg md:text-xl font-bold">⚠️ 그룹 삭제 경고 ⚠️</h2>
        <p className="mt-4 text-greyDark text-sm md:text-base leading-relaxed">
          <strong>이 작업은 되돌릴 수 없습니다!</strong> <br />
          그룹과 관련된 모든 정보가 삭제됩니다.
          <br />
          정말로 그룹을 삭제하시겠습니까?
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Button size="cta" variant="outlined" className="w-full md:w-auto" onClick={onClose}>
            취소
          </Button>
          <Button size="cta" variant="emphasized" className="w-full md:w-auto" onClick={onConfirm}>
            삭제 진행
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
