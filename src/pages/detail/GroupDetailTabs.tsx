import { useTranslation } from "react-i18next";

import Tabs from "@/components/tabs/Tabs";

interface GroupDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GroupDetailTabs = ({ activeTab, setActiveTab }: GroupDetailTabsProps) => {
  const { t } = useTranslation();

  const tabs = [
    { key: "info", label: t("group.tabs.intro") },
    {
      key: "notice",
      label: t("group.tabs.notices"),
    },
    {
      key: "member",
      label: t("group.tabs.members"),
    },
  ] as const;

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

export default GroupDetailTabs;
