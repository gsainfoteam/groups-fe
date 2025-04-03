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
import DeleteConfirmationModal from "../../../groupInfo/components/ConfirmModal";
import { Xmark } from "iconoir-react";
import { RoleOption } from "./hooks/useRoleOptions";

interface MemberManagementSectionProps {
  groupUuid: string;
  userRole: UserRole;
}

const MemberManagementSection = ({
  groupUuid,
  userRole,
}: MemberManagementSectionProps) => {
  const { t } = useTranslation();
  const roleOptions = useRoleOptions();

  // 멤버 관리 훅 사용
  const {
    // 상태
    members,
    loading,
    roleChanges,
    selectedMember,
    selectedRole,
    isRoleModalOpen,
    isDeleteModalOpen,

    // API 상호작용 함수
    fetchMembers,
    applyRoleChanges,
    deleteMember,

    // 역할 변경 관련 함수
    selectRole,
    cancelRoleChanges,

    // 모달 상태 관리 함수
    openRoleModal,
    closeRoleModal,
    openDeleteModal,
    closeDeleteModal,
  } = useMemberManagement({ groupUuid });

  // 권한 체크
  const isAuthorizedForRoleChange = authorityChecker(userRole.authorities, [
    "ROLE_GRANT",
    "ROLE_REVOKE",
  ]);

  const isAuthorizedForMemberBanishment = authorityChecker(
    userRole.authorities,
    ["MEMBER_DELETE"],
  );

  const isAdmin = roleNameChecker(userRole.roleName, "admin");

  // 초기 데이터 로드
  useEffect(() => {
    if (groupUuid) {
      fetchMembers();
    }
  }, [groupUuid]);

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

  return (
    <div className="flex flex-col w-full justify-start items-start">
      {/* 타이틀 */}
      <div className="text-dark dark:text-grey text-[28px] font-bold mb-4">
        {t("manageGroup.members.list.title")}
      </div>

      {/* 멤버 테이블 */}
      <div className="w-full overflow-x-scroll overflow-y-visible mb-8">
        <table className="min-w-[800px]">
          <thead>
            <MemberTableHead />
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberTableRow
                key={member.uuid}
                member={member}
                isAuthorizedForRoleChange={isAuthorizedForRoleChange}
                isAuthorizedForMemberBanishment={
                  isAuthorizedForMemberBanishment
                }
                isAdmin={isAdmin}
                roleOptions={roleOptions}
                onRoleChangeClick={openRoleModal}
                onDeleteClick={openDeleteModal}
                roleChanges={roleChanges}
              />
            ))}
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
                selectedRole={selectedRole || roleOptions[0]}
                targetMemberName={selectedMember?.name || ""}
                onRoleSelect={handleRoleSelect}
              />
            </div>
          ),
        }}
        bottomSheetProps={{
          children: (
            <div>
              <div className="w-full flex justify-end px-6 mb-2">
                <Button onClick={closeRoleModal}>
                  <Xmark className="w-6 h-6" />
                </Button>
              </div>
              <RoleSelectionModal
                roleOptions={roleOptions}
                selectedRole={selectedRole || roleOptions[0]}
                targetMemberName={selectedMember?.name || ""}
                onRoleSelect={handleRoleSelect}
              />
            </div>
          ),
        }}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title={t("manageGroup.members.banish.banishWarning")}
        message={t("manageGroup.members.banish.banishConfirm", {
          name: selectedMember?.name,
        })}
      />
    </div>
  );
};

export default MemberManagementSection;
