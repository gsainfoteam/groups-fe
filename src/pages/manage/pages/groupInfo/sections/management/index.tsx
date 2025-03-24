import GroupDeleteComponent from "./GroupDelete";
import GroupLeaveComponent from "./GroupLeaving";

const GroupManagementSection = () => {
  return (
    <div className="w-full p-5 flex flex-col justify-center items-start gap-5 rounded-xl border-[1.5px] border-greyBorder">
      <GroupDeleteComponent />
      <div className="w-full h-px bg-greyBorder" />
      <GroupLeaveComponent />
    </div>
  );
};

export default GroupManagementSection;
