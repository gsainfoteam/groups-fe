import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/button/Button";
import MemberTableRow from "./MemberTableRow";
import MemberTableHead from "./MemberTableHead";
import { useMemberManagement } from "./hooks/useMemberManagement";
import authorityChecker from "@/utils/authorityChecker";
import roleNameChecker from "@/utils/roleNameChecker";
import { UserRole } from "@/pages/manage/ManageLayout";
import RoleSelectionModal from "./RoleSelectionModal";
import useRoleOptions from "./hooks/useRoleOptions";
import ResponsiveModal from "@/components/responsiveModal";
import { Xmark } from "iconoir-react";
import { RoleOption } from "./hooks/useRoleOptions";
import { ExpandedGroupInfo } from "@/types/interfaces";
import BanishModal from "./BanishModal";
import useAuth from "@/hooks/useAuth";
import ChangePresidentModal from "./ChangePresidentModal";

interface MemberManagementSectionProps {
  group: ExpandedGroupInfo;
  userRole: UserRole;
}

const MemberManagementSection = ({
  group,
  userRole,
}: MemberManagementSectionProps) => {
  const { t } = useTranslation();
  const roleOptions = useRoleOptions();
  const { userInfo } = useAuth();

  // 멤버 관리 훅 사용
  const {
    // 상태
    members,
    loading,
    roleChanges,
    selectedMember,
    selectedRole,
    isRoleModalOpen,
    isBanishModalOpen,
    isAppointPresidentModalOpen,
    // API 상호작용 함수
    fetchMembers,
    applyRoleChanges,
    deleteMember,
    appointPresident,
    // 역할 변경 관련 함수
    selectRole,
    cancelRoleChanges,

    // 모달 상태 관리 함수
    openRoleModal,
    closeRoleModal,
    openBanishModal,
    closeBanishModal,

    // 그룹장 임명 모달 상태 관리 함수
    openAppointPresidentModal,
    closeAppointPresidentModal,
  } = useMemberManagement({ groupUuid: group.uuid });

  // 권한 체크
  const isAuthorizedForRoleChange = authorityChecker(userRole.permissions, [
    "ROLE_GRANT",
    "ROLE_REVOKE",
  ]);

  const isAuthorizedForMemberBanishment = authorityChecker(
    userRole.permissions,
    ["MEMBER_DELETE"],
  );

  const isAdmin = roleNameChecker(userRole.roleName, "admin");
  const isPresident = group.president.uuid === userInfo?.uuid;

  // 초기 데이터 로드
  useEffect(() => {
    if (group.uuid) {
      fetchMembers();
    }
  }, [group.uuid]);

  // 역할 선택 핸들러
  const handleRoleSelect = (role: RoleOption) => {
    selectRole(role, roleOptions);
  };

  // 멤버 삭제 핸들러
  const handleDeleteConfirm = async () => {
    const success = await deleteMember();
    if (success) {
      alert(
        t("manageGroup.members.banish.banishSuccess", {
          name: selectedMember?.name,
        }),
      );
    } else {
      alert(t("manageGroup.members.banish.banishFailed"));
    }
  };

  const handleAppointPresidentConfirm = async () => {
    const success = await appointPresident();
    if (success) {
      alert(
        t("manageGroup.members.changePresident.success", {
          name: selectedMember?.name,
        }),
      );
    } else {
      alert(t("manageGroup.members.changePresident.error"));
    }
  };

  return (
    <div className="flex flex-col w-full justify-start items-start">
      {/* 타이틀 */}
      <div className="text-dark dark:text-grey text-[28px] font-bold mb-4">
        {t("manageGroup.members.list.title")}
      </div>

      {/* 멤버 테이블 */}
      <div className="w-full mb-8 overflow-auto">
        <table className="w-[1200px]">
          <thead>
            <MemberTableHead />
          </thead>
          <tbody>
            {members.map((member) => {
              const isThisMemberPresident =
                member.uuid === group.president.uuid;
              const isThisMemberMe = member.uuid === userInfo?.uuid;
              return (
                <MemberTableRow
                  key={member.uuid}
                  member={member}
                  isAuthorizedForRoleChange={isAuthorizedForRoleChange}
                  isAuthorizedForMemberBanishment={
                    isAuthorizedForMemberBanishment
                  }
                  isAdmin={isAdmin}
                  isPresident={isPresident}
                  isThisMemberPresident={isThisMemberPresident}
                  isThisMemberMe={isThisMemberMe}
                  roleOptions={roleOptions}
                  onRoleChangeClick={openRoleModal}
                  onDeleteClick={openBanishModal}
                  onAppointPresidentClick={openAppointPresidentModal}
                  roleChanges={roleChanges}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 액션 버튼 영역 */}
      <div className="flex justify-center self-stretch gap-4">
        {Object.keys(roleChanges).length > 0 && (
          <Button
            size="big"
            variant="outlined"
            className="w-full md:w-40"
            onClick={cancelRoleChanges}
          >
            {t("common.cancel")}
          </Button>
        )}

        <Button
          size="big"
          variant="emphasized"
          className="w-full md:w-40"
          onClick={applyRoleChanges}
          disabled={loading || Object.keys(roleChanges).length === 0}
        >
          {loading ? t("common.loading") : t("common.complete")}
        </Button>
      </div>

      {/* 역할 선택 모달 */}
      <ResponsiveModal
        commonProps={{
          isOpen: isRoleModalOpen,
          onClose: closeRoleModal,
        }}
        modalProps={{
          isWithDefaultFrame: false,
          children: (
            <div className="bg-white py-6 rounded-3xl w-[300px]">
              <div className="w-full flex justify-end px-6 mb-2">
                <Button onClick={closeRoleModal}>
                  <Xmark className="w-6 h-6" />
                </Button>
              </div>

              <RoleSelectionModal
                roleOptions={roleOptions}
                selectedRole={selectedRole ?? roleOptions[0]}
                targetMemberName={selectedMember?.name ?? ""}
                onRoleSelect={handleRoleSelect}
              />
            </div>
          ),
        }}
        bottomSheetProps={{
          isWithDefaultFrame: false,
          children: (
            <div>
              <div className="w-full flex justify-end px-6 mb-2">
                <Button onClick={closeRoleModal}>
                  <Xmark className="w-6 h-6" />
                </Button>
              </div>
              <RoleSelectionModal
                roleOptions={roleOptions}
                selectedRole={selectedRole ?? roleOptions[0]}
                targetMemberName={selectedMember?.name ?? ""}
                onRoleSelect={handleRoleSelect}
              />
            </div>
          ),
        }}
      />

      <ResponsiveModal
        commonProps={{
          isOpen: isBanishModalOpen,
          onClose: closeBanishModal,
        }}
        modalProps={{
          children: (
            <BanishModal
              onClose={closeBanishModal}
              onConfirm={handleDeleteConfirm}
              targetMemberName={selectedMember?.name ?? ""}
            />
          ),
        }}
        bottomSheetProps={{
          children: (
            <BanishModal
              onClose={closeBanishModal}
              onConfirm={handleDeleteConfirm}
              targetMemberName={selectedMember?.name ?? ""}
            />
          ),
        }}
      />

      <ResponsiveModal
        commonProps={{
          isOpen: isAppointPresidentModalOpen,
          onClose: closeAppointPresidentModal,
        }}
        modalProps={{
          children: (
            <ChangePresidentModal
              onClose={closeAppointPresidentModal}
              onConfirm={handleAppointPresidentConfirm}
              targetMemberName={selectedMember?.name ?? ""}
            />
          ),
        }}
        bottomSheetProps={{
          children: (
            <ChangePresidentModal
              onClose={closeAppointPresidentModal}
              onConfirm={handleAppointPresidentConfirm}
              targetMemberName={selectedMember?.name ?? ""}
            />
          ),
        }}
      />
    </div>
  );
};

export default MemberManagementSection;
