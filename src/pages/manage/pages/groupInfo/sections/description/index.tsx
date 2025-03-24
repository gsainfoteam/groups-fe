import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/button/Button";

import { useGroupInfoUpdate } from "../../hooks/useGroupInfoUpdate";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import authorityChecker from "@/utils/authorityChecker";
import { cn } from "@/utils/clsx";
import LockedSign from "@/pages/manage/components/lockedSign";

interface GroupDescriptionSectionProps extends GroupContextType {}

const GroupDescriptionSection = ({
  group,
  setGroup,
  userRole,
}: GroupDescriptionSectionProps) => {
  const { t } = useTranslation();
  const [newGroupDes, setNewGroupDes] = useState("");

  const MAX_DESCRIPTION_LENGTH = 500;

  const isAuthorized = authorityChecker(userRole.authorities, ["GROUP_UPDATE"]);

  const { updateInfo } = useGroupInfoUpdate({
    group,
    setGroup,
    onSuccess: () => {
      setNewGroupDes("");
      alert("그룹 설명이 변경되었습니다.");
    },
    onError: (error) => {
      alert(`그룹 설명 변경에 실패했습니다: ${error.message}`);
    },
  });

  const handleGroupDesChange = () => {
    updateInfo("description", newGroupDes);
  };

  return (
    <div className="flex w-full flex-col justify-center items-start gap-4">
      <h3 className="text-2xl font-bold text-dark dark:text-grey">
        {t("manageGroup.groupInfo.groupIntro.title")}
      </h3>

      <div className="flex items-center gap-4 flex-wrap">
        <p className="text-base font-medium text-dark dark:text-grey">
          {t("manageGroup.groupInfo.groupIntro.description")}
        </p>

        {!isAuthorized && <LockedSign requiredRoleName="admin" />}
      </div>

      <div className="w-full flex flex-col items-end gap-2.5">
        <div className="flex flex-col w-full gap-1.5">
          <textarea
            className={cn(
              "h-[100px] w-full px-4 py-2.5 rounded-xl border-[1.5px] dark:text-black",
              isAuthorized ? "border-primary" : "border-grey bg-white",
            )}
            placeholder={group.description ?? "그룹 설명 없음"}
            value={newGroupDes}
            onChange={(e) => setNewGroupDes(e.target.value)}
            disabled={!isAuthorized}
          ></textarea>
          <p
            className={`flex w-full justify-end text-xs ${
              newGroupDes?.length > MAX_DESCRIPTION_LENGTH
                ? "text-primary"
                : "text-greyDark"
            }`}
          >
            {newGroupDes?.length || 0}/{MAX_DESCRIPTION_LENGTH}
          </p>
        </div>

        <Button
          size="big"
          variant="emphasized"
          className="rounded-[10px]"
          onClick={handleGroupDesChange}
          disabled={
            newGroupDes?.length > MAX_DESCRIPTION_LENGTH || !isAuthorized
          }
        >
          {t("manageGroup.groupInfo.groupIntro.button")}
        </Button>
      </div>
    </div>
  );
};

export default GroupDescriptionSection;
