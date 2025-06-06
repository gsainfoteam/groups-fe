import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@/components/input/Input";
import { GroupInfo } from "@/types/interfaces";
import { useGroupInfoUpdate } from "../../hooks/useGroupInfoUpdate";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import LockedSign from "@/pages/manage/components/lockedSign";
import authorityChecker from "@/utils/authorityChecker";

interface GroupNameSectionProps extends GroupContextType {}

const GroupNameSection = ({ group, userRole }: GroupNameSectionProps) => {
  const { t } = useTranslation();
  const [newGroupName, setNewGroupName] = useState("");

  const isAuthorized = authorityChecker(userRole.authorities, ["GROUP_UPDATE"]);

  const { updateInfo } = useGroupInfoUpdate({
    group,
    onSuccess: () => {
      setNewGroupName("");
      alert(t("manageGroup.groupInfo.groupName.success"));
    },
    onError: (error) => {
      alert(
        t("manageGroup.groupInfo.groupName.error", { message: error.message }),
      );
    },
  });

  const handleGroupNameChange = () => {
    updateInfo("name", newGroupName);
  };

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h3 className="text-2xl font-bold text-dark dark:text-grey">
        {t("manageGroup.groupInfo.groupName.title")}
      </h3>

      <div className="flex items-center gap-4 flex-wrap">
        <p className="text-base font-medium text-dark dark:text-grey">
          {t("manageGroup.groupInfo.groupName.description")}
        </p>

        {!isAuthorized && <LockedSign requiredRoleName="admin" />}
      </div>

      <Input
        width="100%"
        placeholder={group.name}
        disabled={!isAuthorized}
        buttonValue={t("manageGroup.groupInfo.groupName.button")}
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        onButtonClick={handleGroupNameChange}
      />
    </div>
  );
};

export default GroupNameSection;
