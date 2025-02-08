import { useTranslation } from "react-i18next";

import Tabs, { NavLinkTabs } from "@/components/tabs/Tabs";
import Path from "@/types/paths";
import { useParams } from "react-router-dom";

const GroupDetailTabs = () => {
  const { t } = useTranslation();

  const { uuid } = useParams<{ uuid: string }>();

  const tabs = [
    {
      key: "info",
      label: t("group.tabs.intro"),
      link: `${Path.Group + uuid + "/" + Path.GroupInfo}`,
    },
    {
      key: "notice",
      label: t("group.tabs.notices"),
      link: `${Path.Group + uuid + "/" + Path.GroupNotices}`,
    },
    {
      key: "members",
      label: t("group.tabs.members"),
      link: `${Path.Group + uuid + "/" + Path.GroupMembers}`,
    },
  ];

  return <NavLinkTabs tabs={tabs} />;
};

export default GroupDetailTabs;
