import { NavLink } from 'react-router-dom';

const Navigator = () => {
  return (
    <div className="flex items-start h-11 md:h-[50px] w-full border-b-[3px] border-grey">
      <NavLink 
        to="/manage/groupinfo" 
        className={({ isActive }) =>
          isActive
            ? "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center text-primary font-medium border-b-[3px] border-primary"
            : "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center text-grey font-medium"
        }>
        기본 정보
      </NavLink>
      <NavLink 
        to="/manage/notionlink" 
        className={({ isActive }) =>
          isActive
            ? "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center text-primary font-medium border-b-[3px] border-primary"
            : "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center text-grey font-medium"
        }>
        소개 페이지
      </NavLink>
      <NavLink 
        to="/manage/members" 
        className={({ isActive }) =>
          isActive
            ? "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center text-primary font-medium border-b-[3px] border-primary"
            : "box-border h-11 md:h-[50px] flex p-2.5 justify-center items-center text-grey font-medium"
        }>
        멤버
      </NavLink>
    </div>
  );
};

export default Navigator;
