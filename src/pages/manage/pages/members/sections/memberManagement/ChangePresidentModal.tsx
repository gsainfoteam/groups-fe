import Button from "@/components/button/Button";
import { Trans, useTranslation } from "react-i18next";
interface ChangePresidentModalProps {
  onClose: () => void;
  onConfirm: () => void;
  targetMemberName: string;
}

const ChangePresidentModal = ({
  onClose,
  onConfirm,
  targetMemberName,
}: ChangePresidentModalProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2
        id="modal-title"
        className="text-dark text-xl font-semibold mb-2 text-center"
      >
        <Trans i18nKey="manageGroup.members.changePresident.title">
          {{ name: targetMemberName }}
        </Trans>
      </h2>

      <p className="text-greyDark w-full px-6 font-regular mt-2 text-center">
        {t("manageGroup.members.changePresident.description")}
      </p>

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

export default ChangePresidentModal;
