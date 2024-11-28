import { NavLinkTabs } from "@/components/tabs/Tabs";
import Path from "@/types/paths";
import { useParams } from "react-router-dom";

const Navigator = () => {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) {
    return <div>유효하지 않은 그룹 ID입니다.</div>;
  }

  const tabs = [
    {
      key: "groupInfo",
      label: "기본 정보",
      link: `${Path.Manage+uuid+"/"+Path.ManageGroupInfo}`,
    },
    {
      key: "notionLink",
      label: "소개 페이지",
      link: `${Path.Manage+uuid+"/"+Path.ManageNotionLink}`,
    },
    {
      key: "members",
      label: "멤버",
      link: `${Path.Manage+uuid+"/"+Path.ManageMembers}`,
    },
  ];

  return (
    <div className="w-full">
      <NavLinkTabs tabs={tabs} />
    </div>
  );
};

export default Navigator;
