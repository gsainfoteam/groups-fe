import Button from "@/components/button/Button";
import Path from "@/types/paths";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CompleteAnimation from "../../components/CompleteAnimation";
import GenerateInvitationLink from "./GenerateInvitationLink";
import { useGroupCreation } from "../../context/GroupCreationContext";
import { useEffect } from "react";

const CreateGroupComplete = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, resetState } = useGroupCreation();
  const groupName = state.groupName || "Your Group";
  const groupUuid = state.groupUuid;

  const handleCompleteClick = () => {
    resetState(); // TODO: 유저가 돌아가기를 누르지 않고 이탈하는 경우, 어떻게 로컬스토리지 함태를 초기화할지 고민해봐야 함
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

        <p className="text-greyDark dark:text-grey">
          {t("createGroup.complete.description")}
        </p>

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
