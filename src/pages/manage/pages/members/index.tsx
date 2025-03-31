import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import InvitationSection from "./sections/invitation";
import MemberManagementSection from "./sections/memberManagement";
import RoleDescriptionSection from "./sections/roleDescription";
import { useTranslation } from "react-i18next";

const ManageMembersPage = () => {
  const { group, userRole } = useOutletContext<GroupContextType>();
  const { t } = useTranslation();

  if (!group) {
    return <p>{t("common.loading")}</p>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      <InvitationSection groupUuid={group.uuid} userRole={userRole} />
      <MemberManagementSection groupUuid={group.uuid} userRole={userRole} />
      <RoleDescriptionSection />
    </div>
  );
};

export default ManageMembersPage;
