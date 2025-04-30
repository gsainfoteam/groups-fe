import Button from "@/components/button/Button";
import { Trans, useTranslation } from "react-i18next";
interface BanishModalProps {
  onClose: () => void;
  onConfirm: () => void;
  targetMemberName: string;
}

const BanishModal = ({
  onClose,
  onConfirm,
  targetMemberName,
}: BanishModalProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2
        id="modal-title"
        className="text-dark dark:text-grey text-xl font-semibold mb-2 text-center "
      >
        <Trans i18nKey="manageGroup.members.banish.banishConfirm">
          {{ name: targetMemberName }}
        </Trans>
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

export default BanishModal;
