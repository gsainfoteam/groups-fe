import { useTranslation } from "react-i18next";

const headerItems = [
  { label: "name", width: "w-[62px] md:w-[62px]" },
  { label: "email", width: "w-[232px] md:w-[232px]" },
  { label: "role", width: "w-[220px] md:w-[220px]" },
  { label: "expel", width: "w-[76px] md:w-[76px]" },
] as const;

const MembersHeader = () => {
  const { t } = useTranslation();

  return (
    <header
      className="flex h-[39px] justify-start items-center w-full"
      aria-label="회원 목록 헤더"
    >
      {headerItems.map(({ label, width }) => (
        <th
          key={label}
          className={`flex p-2.5 ${width} h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark`}
        >
          {t(`manageGroup.members.list.table.${label}` as const)}
        </th>
      ))}
    </header>
  );
};

export default MembersHeader;
