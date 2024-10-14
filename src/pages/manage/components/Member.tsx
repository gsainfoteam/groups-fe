import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import { useTranslation } from "react-i18next";

type Role = "admin" | "manager" | "normal";

export interface MemberProps {
  name: string;
  email: string;
  role: Role;
}

const Member = ({ name, email, role }: MemberProps) => {
  const { t } = useTranslation();

  return (
    <article className="flex h-[50px] justify-start items-center">
      {/* 이름 */}
      <div className="flex p-2.5 w-[62px] md:w-[62px] h-[50px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyBorder">{name}</div>
      {/* 이메일 */}
      <div className="flex p-2.5 w-[232px] md:w-[232px] h-[50px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyBorder">{email}</div>
      {/* 역할 */}
      <div className="flex justify-start p-2.5 w-[220px] md:w-[220px] h-[50px] border-b-2 border-greyBorder">
        <div className="w-full h-[30px] pl-3 pr-2.5 py-[5px] bg-greyLight rounded-[5px] flex justify-start items-center gap-2.5">
          <div className={`grow shrink basis-0 text-base font-medium ${(role === "admin" || role === "manager") ? "text-primary" : "text-greyDark"}`}>
            {t(`manageGroup.members.list.table.${role}` as const)}
          </div>
          <ArrowRight className="stroke-dark w-5 h-5 rotate-90" />
        </div>
      </div>
      {/* 추방 버튼 */}
      <button className="flex underline p-2.5 w-[76px] md:w-[76px] h-[50px] justify-start items-center text-grey text-base font-medium border-b-2 border-greyBorder">
        {t("manageGroup.members.list.table.expelButton")}
      </button>
    </article>
  );
};

export default Member;
