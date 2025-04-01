import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../../ManageLayout";
import ImageSection from "./sections/image";
import GroupNameSection from "./sections/name";
import GroupDescriptionSection from "./sections/description";
import GroupManagementSection from "./sections/management";
<<<<<<< Updated upstream
=======
import { useTranslation } from "react-i18next";
import Loading from "@/components/loading/Loading";
>>>>>>> Stashed changes

const ManageGroupInfoPage = () => {
  const groupContext = useOutletContext<GroupContextType>();

  const { group, userRole } = groupContext;

<<<<<<< Updated upstream
  if (!group) return <p>데이터를 불러오는 중...</p>;
=======
  if (!group) return <Loading />;
>>>>>>> Stashed changes

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
