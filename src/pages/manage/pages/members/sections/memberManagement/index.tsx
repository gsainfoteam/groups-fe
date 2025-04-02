import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/button/Button";
import MemberTableRow from "./MemberTableRow";
import MemberTableHead from "./MemberTableHead";
import { useMemberManagement } from "./hooks/useMemberManagement";
import authorityChecker from "@/utils/authorityChecker";
import roleNameChecker from "@/utils/roleNameChecker";
import { UserRole } from "@/pages/manage/ManageLayout";

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
  } = useMemberManagement({ groupUuid });

  const isAuthorizedForRoleChange = authorityChecker(userRole.authorities, [
    "ROLE_GRANT",
    "ROLE_REVOKE",
  ]);

  const isAuthorizedForMemberBanishment = authorityChecker(
    userRole.authorities,
    ["MEMBER_DELETE"],
  );

  const isAdmin = roleNameChecker(userRole.roleName, "admin");

  useEffect(() => {
    if (groupUuid) {
      fetchMembers();
    }
  }, [groupUuid]);

  return (
    <div className="flex flex-col w-full justify-start items-start gap-[15px]">
      <div className="text-dark dark:text-grey text-[28px] font-bold">
        {t("manageGroup.members.list.title")}
      </div>

      <div className="w-full overflow-x-scroll overflow-y-visible">
        <table className="min-w-[800px]">
          <thead>
            <MemberTableHead />
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberTableRow
                key={member.uuid}
                uuid={member.uuid}
                name={member.name}
                email={member.email}
                role={
                  member.role === "admin"
                    ? t("role.admin")
                    : member.role === "manager"
                      ? t("role.manager")
                      : t("role.member")
                }
                onRoleChange={handleRoleChange}
                isAuthorizedForRoleChange={isAuthorizedForRoleChange}
                isAuthorizedForMemberBanishment={
                  isAuthorizedForMemberBanishment
                }
                isAdmin={isAdmin}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center self-stretch">
        <Button
          size="cta"
          variant="emphasized"
          className="w-full md:w-60"
          onClick={handleComplete}
          disabled={loading || Object.keys(roleChanges).length === 0}
        >
          {loading ? t("common.loading") : t("common.complete")}
        </Button>
      </div>
    </div>
  );
};

export default MemberManagementSection;
