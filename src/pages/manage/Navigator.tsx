import { NavLinkTabs } from "@/components/tabs/Tabs";
import Path from "@/types/paths";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TabInfo {
  key: string;
  label: string;
  link: string;
}

const Navigator = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!uuid) {
    return (
      <div>
        <p>{t("manageGroup.invalidGroupId")}</p>
        <button onClick={() => navigate("/")}>{t("common.backToHome")}</button>
      </div>
    );
  }
  const tabs: TabInfo[] = [
    {
      key: "groupInfo",
      label: t("manageGroup.tabs.groupInfo"),
      link: `${Path.Manage + uuid + "/" + Path.ManageGroupInfo}`,
    },
    {
      key: "notionLink",
      label: t("manageGroup.tabs.intro"),
      link: `${Path.Manage + uuid + "/" + Path.ManageNotionLink}`,
    },
    {
      key: "members",
      label: t("manageGroup.tabs.members"),
      link: `${Path.Manage + uuid + "/" + Path.ManageMembers}`,
    },
  ];

  return (
    <div className="w-full">
      <NavLinkTabs tabs={tabs} />
    </div>
  );
};

export default Navigator;
