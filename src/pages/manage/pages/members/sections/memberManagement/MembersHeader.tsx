import { useTranslation } from "react-i18next";

const headerItems = [
  { label: "name" },
  { label: "email" },
  { label: "role" },
  { label: "expel" },
] as const;

const MembersHeader = () => {
  const { t } = useTranslation();

  return (
    <thead aria-label="회원 목록 헤더">
      <tr>
        {headerItems.map(({ label }) => (
          <th
            key={label}
            className="p-2.5 text-left text-greyDark text-base font-medium border-b-2 border-greyDark"
          >
            {t(`manageGroup.members.list.table.${label}` as const)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default MembersHeader;
