import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { useOutletContext } from "react-router-dom";
import { GroupInfo } from "@/types/interfaces";
import { getGroup } from "@/apis/group";
import { useState } from "react";
import { changeGroupInfo } from "@/apis/group";
import GroupLeaveComponent from "./component/GroupLeaving";
import GroupDeleteComponent from "./component/GroupDelete";
import ImageSection from "./component/ImageSection";
import { useTranslation } from "react-i18next";

export type GroupContextType = {
  group: GroupInfo | null;
  setGroup: React.Dispatch<React.SetStateAction<GroupInfo | null>>;
};

const ManageGroupInfoPage: React.FC = () => {
  const { t } = useTranslation();
  const { group, setGroup } = useOutletContext<GroupContextType>();
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDes, setNewGroupDes] = useState("");

  if (!group) return <p>데이터를 불러오는 중...</p>;

  // 그룹명, 그룹설명 변경 시
  const handleGroupInfoChange = async (
    field: "name" | "description",
    newValue: string,
    setNewValue: React.Dispatch<React.SetStateAction<string>>,
  ): Promise<void> => {
    if (!newValue.trim()) {
      alert(
        `새 ${field === "name" ? "그룹명" : "그룹 설명"}을(를) 입력해주세요.`,
      );
      return;
    }

    try {
      await changeGroupInfo(group.uuid, { [field]: newValue });
      const updatedGroup = await getGroup(group.uuid);
      setGroup(updatedGroup);
      setNewValue("");
      alert(
        `${field === "name" ? "그룹명이" : "그룹 설명이"} 변경 되었습니다.`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      console.error(
        `${field === "name" ? "그룹명" : "그룹 설명"} 변경 실패:`,
        errorMessage,
      );
      alert(
        `${field === "name" ? "그룹명" : "그룹 설명"} 변경에 실패했습니다: ${errorMessage}`,
      );
    }
  };

  const handleGroupNameChange = (): void => {
    handleGroupInfoChange("name", newGroupName, setNewGroupName);
  };

  const handleGroupDesChange = (): void => {
    handleGroupInfoChange("description", newGroupDes, setNewGroupDes);
  };

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      {/* 그룹 이미지 관리 */}
      <ImageSection group={group} setGroup={setGroup} />
      {/* 그룹명 관리 */}
      <div className="flex w-full flex-col items-start gap-4">
        <p className="text-2xl font-bold text-dark">
          {t("manageGroup.groupInfo.groupName.title")}
        </p>
        <p className="text-base font-medium text-dark">
          {t("manageGroup.groupInfo.groupName.description")}
        </p>

        <Input
          width="100%"
          placeholder={group.name}
          buttonValue={t("manageGroup.groupInfo.groupName.button")}
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          onButtonClick={handleGroupNameChange}
        />
      </div>
      {/* 그룹 간단 소개 관리 */}
      <div className="flex w-full flex-col justify-center items-start gap-4">
        <p className="text-2xl font-bold text-dark">
          {t("manageGroup.groupInfo.groupIntro.title")}
        </p>
        <p className="text-base font-medium text-dark">
          {t("manageGroup.groupInfo.groupIntro.description")}
        </p>

        <div className="w-full flex flex-col items-end gap-2.5">
          <div className="flex flex-col w-full gap-1.5">
            <textarea
              className="h-[100px] w-full px-4 py-2.5 rounded-xl border border-primary border-[1.5px]"
              placeholder={group.description || "그룹 설명 없음"}
              value={newGroupDes}
              onChange={(e) => setNewGroupDes(e.target.value)}
            ></textarea>
            <p
              className={`flex w-full justify-end text-xs ${
                newGroupDes?.length > 500 ? "text-primary" : "text-greyDark"
              }`}
            >
              {newGroupDes?.length || 0}/500
            </p>
          </div>

          <Button
            size="big"
            variant="emphasized"
            className="rounded-[10px]"
            onClick={handleGroupDesChange}
            disabled={newGroupDes?.length > 500}
          >
            {t("manageGroup.groupInfo.groupIntro.button")}
          </Button>
        </div>
      </div>

      {/* 그룹 삭제 및 나가기 */}
      <div className="w-full p-5 flex flex-col justify-center items-start gap-5 rounded-xl border-2 border-greyBorder">
        <GroupDeleteComponent />
        <div className="w-full h-[1.5px] bg-greyBorder" />
        <GroupLeaveComponent />
      </div>
    </div>
  );
};

export default ManageGroupInfoPage;
