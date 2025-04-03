import { useEffect, useState } from "react";
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
import { MemberResDto } from "@/types/interfaces";
import { RoleOption } from "./hooks/useRoleOptions";
import { banishMember } from "@/apis/group";
import { Xmark } from "iconoir-react";

interface MemberManagementSectionProps {
  groupUuid: string;
  userRole: UserRole;
}

const MemberManagementSection = ({
  groupUuid,
  userRole,
}: MemberManagementSectionProps) => {
  const { t } = useTranslation();
  const {
    members,
    loading,
    roleChanges,
    handleRoleChange,
    handleComplete,
    fetchMembers,
    setRoleChanges,
  } = useMemberManagement({ groupUuid });

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const isAuthorizedForRoleChange = authorityChecker(userRole.authorities, [
    "ROLE_GRANT",
    "ROLE_REVOKE",
  ]);

  const isAuthorizedForMemberBanishment = authorityChecker(
    userRole.authorities,
    ["MEMBER_DELETE"],
  );

  const isAdmin = roleNameChecker(userRole.roleName, "admin");

  const roleOptions = useRoleOptions();

  useEffect(() => {
    if (groupUuid) {
      fetchMembers();
    }
  }, [groupUuid]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberResDto | null>(
    null,
  );
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);

  const handleRoleChangeClick = (member: MemberResDto, role: RoleOption) => {
    setSelectedMember(member);
    setSelectedRole(role);
    setIsRoleModalOpen(true);
  };

  const handleRoleSelect = (role: RoleOption) => {
    if (!selectedMember) return;
    const defaultRole =
      roleOptions.find((option) => option.name === selectedMember.role) ??
      roleOptions[0];

    handleRoleChange(selectedMember.uuid, defaultRole.id, role.id);
    setSelectedRole(role);
  };

  const handleDeleteClick = (member: MemberResDto) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedMember) {
      try {
        await banishMember(groupUuid, selectedMember.uuid);
        alert(
          t("manageGroup.members.banish.banishSuccess", {
            name: selectedMember.name,
          }),
        );
      } catch (error) {
        alert(t("manageGroup.members.banish.banishFailed"));
      } finally {
        setIsDeleteModalOpen(false);
        setSelectedMember(null);
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-start items-start">
      <div className="text-dark dark:text-grey text-[28px] font-bold mb-4">
        {t("manageGroup.members.list.title")}
      </div>

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
                onRoleChangeClick={handleRoleChangeClick}
                onDeleteClick={handleDeleteClick}
                roleChanges={roleChanges}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center self-stretch gap-4">
        {Object.keys(roleChanges).length > 0 && (
          <Button
            size="big"
            variant="outlined"
            className="w-full md:w-40"
            onClick={() => {
              setRoleChanges({});
              setIsRoleModalOpen(false);
              setSelectedMember(null);
              setSelectedRole(null);
            }}
          >
            {t("common.cancel")}
          </Button>
        )}

        <Button
          size="big"
          variant="emphasized"
          className="w-full md:w-40"
          onClick={handleComplete}
          disabled={loading || Object.keys(roleChanges).length === 0}
        >
          {loading ? t("common.loading") : t("common.complete")}
        </Button>
      </div>

      <ResponsiveModal
        commonProps={{
          isOpen: isRoleModalOpen,
          onClose: () => {
            setIsRoleModalOpen(false);
            setSelectedMember(null);
            setSelectedRole(null);
          },
        }}
        modalProps={{
          isWithDefaultFrame: false,
          children: (
            <div className="bg-white py-6 rounded-3xl w-[300px]">
              <div className="w-full flex justify-end px-6 mb-2">
                <Button
                  onClick={() => {
                    setIsRoleModalOpen(false);
                    setSelectedMember(null);
                    setSelectedRole(null);
                  }}
                >
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
                <Button
                  onClick={() => {
                    setIsRoleModalOpen(false);
                    setSelectedMember(null);
                    setSelectedRole(null);
                  }}
                >
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMember(null);
        }}
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
