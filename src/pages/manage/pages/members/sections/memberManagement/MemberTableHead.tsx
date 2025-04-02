import { useTranslation } from "react-i18next";

const headerItems = [
  { label: "name" },
  { label: "email" },
  { label: "role" },
  { label: "banish" },
] as const;

const MembersHeader = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default MembersHeader;
