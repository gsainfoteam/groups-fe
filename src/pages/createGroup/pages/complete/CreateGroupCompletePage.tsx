import Button from "@/components/button/Button";
import Path from "@/types/paths";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import CompleteAnimation from "../../components/CompleteAnimation";
import GenerateInvitationLink from "./GenerateInvitationLink";

const CreateGroupComplete = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const groupName = location.state.groupName || "Your Group";
  const groupUuid: string | undefined = location.state.groupUuid;

  const handleCompleteClick = () => {
    navigate(Path.Home);
  };

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center py-[60px] md:min-h-[500px]">
        <CompleteAnimation />

        <h2 className="mb-[10px] mt-[15px] break-keep text-center text-[28px] font-bold">
          <Trans t={t} i18nKey="createGroup.complete.title">
            {{ groupName }}
          </Trans>
        </h2>

        <p className="text-greyDark">{t("createGroup.complete.description")}</p>

        <div className="h-16" />

        {groupUuid ? (
          <GenerateInvitationLink groupUuid={groupUuid} />
        ) : (
          <div>{t("groupInvitation.error.unknownError")}</div>
        )}
      </section>

      <Button
        variant="emphasized"
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        size="cta"
        onClick={handleCompleteClick}
      >
        {t("createGroup.goBack")}
      </Button>
    </>
  );
};

export default CreateGroupComplete;
