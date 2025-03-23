import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../../ManageLayout";
import ImageSection from "./sections/ImageSection";
import GroupNameSection from "./sections/GroupNameSection";
import GroupDescriptionSection from "./sections/GroupDescriptionSection";
import GroupManagementSection from "./sections/GroupManagementSection";

const ManageGroupInfoPage = () => {
  const { group, setGroup, userRole } = useOutletContext<GroupContextType>();

  if (!group) return <p>데이터를 불러오는 중...</p>;

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      <ImageSection group={group} setGroup={setGroup} userRole={userRole} />
      <GroupNameSection group={group} setGroup={setGroup} />
      <GroupDescriptionSection group={group} setGroup={setGroup} />
      <GroupManagementSection />
    </div>
  );
};

export default ManageGroupInfoPage;
