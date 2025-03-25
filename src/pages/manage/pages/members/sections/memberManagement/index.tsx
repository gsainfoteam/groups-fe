import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/button/Button";
import MemberTableRow from "./MemberTableRow";
import MemberTableHead from "./MemberTableHead";
import { useMemberManagement } from "./hooks/useMemberManagement";

interface MemberManagementSectionProps {
  groupUuid: string;
}

const MemberManagementSection = ({
  groupUuid,
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
        <table className="min-w-[600px]">
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
                    ? "관리자"
                    : member.role === "manager"
                      ? "매니저"
                      : "일반"
                }
                onRoleChange={handleRoleChange}
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
          {loading ? "처리 중..." : "완료"}
        </Button>
      </div>
    </div>
  );
};

export default MemberManagementSection;
