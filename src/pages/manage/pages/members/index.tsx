import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import InvitationSection from "./sections/invitation";
import MemberManagementSection from "./sections/memberManagement";
import RoleDescriptionSection from "./sections/roleDescription";

const ManageMembersPage = () => {
  const { group, userRole } = useOutletContext<GroupContextType>();

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      <InvitationSection
        groupUuid={group.uuid}
        userAuthorities={userRole.authorities}
      />
      <MemberManagementSection groupUuid={group.uuid} />
      <RoleDescriptionSection />
    </div>
  );
};

export default ManageMembersPage;
