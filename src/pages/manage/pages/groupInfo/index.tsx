import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../../ManageLayout";
import ImageSection from "./sections/ImageSection";
import GroupNameSection from "./sections/GroupNameSection";
import GroupDescriptionSection from "./sections/GroupDescriptionSection";
import GroupManagementSection from "./sections/GroupManagementSection";

const ManageGroupInfoPage = () => {
  const groupContext = useOutletContext<GroupContextType>();

  const { group, setGroup, userRole } = groupContext;

  if (!group) return <p>데이터를 불러오는 중...</p>;

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      <ImageSection {...groupContext} />
      <GroupNameSection {...groupContext} />
      <GroupDescriptionSection {...groupContext} />
      <GroupManagementSection />
    </div>
  );
};

export default ManageGroupInfoPage;
