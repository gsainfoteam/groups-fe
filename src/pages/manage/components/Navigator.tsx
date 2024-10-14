import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const baseStyle = "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center font-medium";
const activeStyle = "text-primary border-b-[3px] border-primary";
const inactiveStyle = "text-grey";

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;

const Navigator = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start h-11 md:h-[50px] w-full border-b-[3px] border-grey">
      <NavLink 
        to="/manage/groupinfo" 
        className={getNavLinkClassName}>
        {t("manageGroup.groupinfo.name")}
      </NavLink>
      <NavLink 
        to="/manage/notionlink" 
        className={getNavLinkClassName}>
        {t("manageGroup.notionlink.name")}
      </NavLink>
      <NavLink 
        to="/manage/members" 
        className={getNavLinkClassName}>
        {t("manageGroup.members.name")}
      </NavLink>
    </div>
  );
};

export default Navigator;
