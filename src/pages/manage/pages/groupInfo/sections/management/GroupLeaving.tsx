import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import Button from "@/components/button/Button";
import { leavingGroup } from "@/apis/group";
import authorityChecker from "@/utils/authorityChecker";
import LockedSign from "@/pages/manage/components/lockedSign";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/loading/Loading";
import ResponsiveModal from "@/components/responsiveModal";
import GroupLeavingModal from "./GroupLeavingModal";
const GroupLeaveComponent = () => {
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const { group, userRole } = useOutletContext<GroupContextType>();
  const navigate = useNavigate();

  const [isLeaving, setIsLeaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <Loading />;
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
      alert(t("manageGroup.groupInfo.groupLeave.success"));
      navigate("/");
    } catch (error) {
      alert(t("manageGroup.groupInfo.groupLeave.error"));
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
                  customText={t(
                    "manageGroup.groupInfo.groupLeave.presidentCannot",
                  )}
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
          {isLeaving
            ? t("manageGroup.groupInfo.groupLeave.leaving")
            : t("manageGroup.groupInfo.groupLeave.button")}
        </Button>
      </div>

      <ResponsiveModal
        commonProps={{
          isOpen: isModalOpen,
          onClose: handleCloseModal,
        }}
        modalProps={{
          children: (
            <GroupLeavingModal
              onClose={handleCloseModal}
              onConfirm={handleConfirmLeave}
            />
          ),
        }}
        bottomSheetProps={{
          children: (
            <GroupLeavingModal
              onClose={handleCloseModal}
              onConfirm={handleConfirmLeave}
            />
          ),
        }}
      />
    </>
  );
};

export default GroupLeaveComponent;
