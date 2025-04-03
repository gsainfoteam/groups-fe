import Button from "@/components/button/Button";
import { useTranslation } from "react-i18next";
interface GroupDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const GroupDeleteModal = ({ onClose, onConfirm }: GroupDeleteModalProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2
        id="modal-title"
        className="text-dark text-xl font-semibold mb-2 text-center"
      >
        {t("manageGroup.groupInfo.groupDelete.confirm")}
      </h2>

      <div className="flex gap-2 mt-6 w-full">
        <Button
          size="big"
          variant="outlined"
          className="w-full"
          onClick={onClose}
        >
          {t("alertResponse.cancel")}
        </Button>
        <Button
          size="big"
          variant="emphasized"
          className="w-full"
          onClick={onConfirm}
        >
          {t("alertResponse.confirm")}
        </Button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
