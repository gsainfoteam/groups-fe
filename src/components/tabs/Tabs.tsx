import { cn } from "@/utils/clsx";
import { ClassValue } from "clsx";
import { NavLink } from "react-router-dom";

const ButtonClass: ClassValue = "flex-none border-b-[3px] p-[15px] pb-3";

interface TabInfo {
  key: string;
  label: string;
  link?: string;
}

interface TabProps {
  tabInfo: TabInfo;
  isActive: boolean;
  onClick?: () => void;
}

const Tab = ({ tabInfo, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={cn(ButtonClass, isActive ? "border-primary" : "border-grey")}
  >
    <p className={cn("text-center", isActive ? "text-primary" : "text-grey")}>
      {tabInfo.label}
    </p>
  </button>
);

interface TabsProps {
  tabs: readonly TabInfo[];
  activeTab: string;

  setActiveTab: (key: any) => void;
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className={"flex"}>
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          tabInfo={tab}
          isActive={activeTab === tab.key}
          onClick={() => setActiveTab(tab.key)}
        />
      ))}
      <div className={"flex-grow border-b-[3px] border-grey"} />
    </div>
  );
};

interface NavLinkTabsProps {
  tabs: Required<TabInfo>[];
}

export const NavLinkTabs = ({ tabs }: NavLinkTabsProps) => (
  <div className={"flex"}>
    {tabs.map((tab) => (
      <NavLink key={tab.key} to={tab.link}>
        {({ isActive }) => <Tab tabInfo={tab} isActive={isActive} />}
      </NavLink>
    ))}
    <div className={"flex-grow border-b-[3px] border-grey"} />
  </div>
);

export default Tabs;
