import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import InvitationSection from "./sections/invitation";
import MemberManagementSection from "./sections/memberManagement";
import RoleDescriptionSection from "./sections/roleDescription";
<<<<<<< Updated upstream
=======
import { useTranslation } from "react-i18next";
import Loading from "@/components/loading/Loading";
>>>>>>> Stashed changes

const ManageMembersPage = () => {
  const { group, userRole } = useOutletContext<GroupContextType>();

  if (!group) {
<<<<<<< Updated upstream
    return <p>데이터를 불러오는 중...</p>;
=======
    return <Loading />;
>>>>>>> Stashed changes
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
