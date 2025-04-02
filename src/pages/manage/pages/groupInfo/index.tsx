import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../../ManageLayout";
import ImageSection from "./sections/image";
import GroupNameSection from "./sections/name";
import GroupDescriptionSection from "./sections/description";
import GroupManagementSection from "./sections/management";
import Loading from "@/components/loading/Loading";

const ManageGroupInfoPage = () => {
  const groupContext = useOutletContext<GroupContextType>();

  const { group } = groupContext;

  if (!group) return <Loading />;

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
