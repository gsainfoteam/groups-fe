import { NavLinkTabs } from "@/components/tabs/Tabs";
import Path from "@/types/paths";

const Navigator = () => {
  const tabs = [
    {
      key: "groupInfo",
      label: "기본 정보",
      link: Path.ManageGroupInfo,
    },
    {
      key: "notionLink",
      label: "소개 페이지",
      link: Path.ManageNotionLink,
    },
    {
      key: "members",
      label: "멤버",
      link: Path.ManageMembers,
    },
  ];

  return (
    <div className="w-full">
      <NavLinkTabs tabs={tabs} />
    </div>
  );
};

export default Navigator;
