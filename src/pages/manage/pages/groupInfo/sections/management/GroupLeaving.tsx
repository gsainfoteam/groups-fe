import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import Button from "@/components/button/Button";
import { leavingGroup } from "@/apis/group";
import ConfirmationModal from "../../components/ConfirmModal";
import authorityChecker from "@/utils/authorityChecker";
import LockedSign from "@/pages/manage/components/lockedSign";
import useAuth from "@/hooks/useAuth";

const GroupLeaveComponent = () => {
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const { group, userRole } = useOutletContext<GroupContextType>();
  const navigate = useNavigate();

  const [isLeaving, setIsLeaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  const isPresident = group.president.uuid === userInfo?.uuid;
  const isAuthorized =
    authorityChecker(userRole.authorities, []) && !isPresident;

  // 나가기 클릭 시
  const handleLeaveClick = () => {
    setIsModalOpen(true);
  };

  // 모달에서 나가기 확인 시
  const handleConfirmLeave = async () => {
    setIsModalOpen(false);
    setIsLeaving(true);
    try {
      await leavingGroup(group.uuid);
      alert("그룹에서 성공적으로 나갔습니다.");
      navigate("/");
    } catch (error) {
      alert("그룹 나가기에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLeaving(false);
      setIsModalOpen(false);
    }
  };

  // 모달에서 취소 시
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-center gap-5 self-stretch flex-wrap md:flex-nowrap">
        <div className="flex flex-col items-start gap-2.5 md:flex-1">
          <h4 className="self-stretch text-primary font-semibold text-xl">
            {t("manageGroup.groupInfo.groupLeave.title")}
          </h4>

          {!isAuthorized && (
            <>
              {isPresident && (
                <LockedSign
                  requiredRoleName="member"
                  customText="그룹장은 이 작업을 수행할 수 없습니다."
                />
              )}
              {!isPresident && <LockedSign requiredRoleName="member" />}
            </>
          )}

          <p className="self-stretch text-greyDark text-base">
            {t("manageGroup.groupInfo.groupLeave.description")}
          </p>
        </div>

        <Button
          size="small"
          variant={isAuthorized ? "outlined" : "disabled"}
          onClick={handleLeaveClick}
          disabled={isLeaving || !isAuthorized}
        >
          {isLeaving ? "나가는 중..." : "나가기"}
        </Button>
      </div>

      {/* 그룹 나가기 확인 모달 */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLeave}
        title="⚠️ 그룹 나가기 경고 ⚠️"
        message="정말로 그룹에서 나가시겠습니까?"
      />
    </>
  );
};

export default GroupLeaveComponent;
