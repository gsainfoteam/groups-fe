import GroupLeaveComponent from "../components/GroupLeaving";
import GroupDeleteComponent from "../components/GroupDelete";

const GroupManagementSection = () => {
  return (
    <div className="w-full p-5 flex flex-col justify-center items-start gap-5 rounded-xl border-2 border-greyBorder">
      <GroupDeleteComponent />
      <div className="w-full h-[1.5px] bg-greyBorder" />
      <GroupLeaveComponent />
    </div>
  );
};

export default GroupManagementSection;
