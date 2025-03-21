import { NavLinkTabs } from "@/components/tabs/Tabs";
import Path from "@/types/paths";
import { useParams, useNavigate } from "react-router-dom";

const Navigator = ({ role }: { role: string }) => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  if (!uuid) {
    return (
      <div>
        <p>유효하지 않은 그룹 ID입니다.</p>
        <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
      </div>
    );
  }
  interface TabInfo {
    key: string;
    label: string;
    link: string;
  }
  let tabs: TabInfo[] = [];
  if (role === "admin") {
    tabs = [
      {
        key: "groupInfo",
        label: "기본 정보",
        link: `${Path.Manage + uuid + "/" + role + "/" + Path.ManageGroupInfo}`,
      },
      {
        key: "notionLink",
        label: "소개 페이지",
        link: `${Path.Manage + uuid + "/" + role + "/" + Path.ManageNotionLink}`,
      },
      {
        key: "members",
        label: "멤버",
        link: `${Path.Manage + uuid + "/" + role + "/" + Path.ManageMembers}`,
      },
    ];
  } else if (role === "manager") {
    tabs = [
      {
        key: "manager",
        label: "초대",
        link: `${Path.Manage + uuid + "/" + role + "/" + Path.ManageOnlyInvite}`,
      },
    ];
  } else {
    tabs = [
      {
        key: "member",
        label: "나가기",
        link: `${Path.Manage + uuid + "/" + role + "/" + Path.ManageOnlyLeave}`,
      },
    ];
  }

  return (
    <div className="w-full">
      <NavLinkTabs tabs={tabs} />
    </div>
  );
};

export default Navigator;
