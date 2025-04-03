import { MemberResDto } from "@/types/interfaces";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import { ClassValue } from "clsx";
import { cn } from "@/utils/clsx";
import LockedSign from "@/pages/manage/components/lockedSign";
import Loading from "@/components/loading/Loading";
import { useTranslation } from "react-i18next";
import { RoleOption } from "./hooks/useRoleOptions";
import Button from "@/components/button/Button";
import { NavArrowRight } from "iconoir-react";

interface MemberTableRowProps {
  member: MemberResDto;
  isAuthorizedForRoleChange: boolean;
  isAuthorizedForMemberBanishment: boolean;
  isAdmin: boolean;
  roleOptions: RoleOption[];
  onRoleChangeClick: (member: MemberResDto, role: RoleOption) => void;
  onDeleteClick: (member: MemberResDto) => void;
  roleChanges: { [key: string]: number[] };
}

const MemberTableRow = ({
  member,
  isAuthorizedForRoleChange,
  isAuthorizedForMemberBanishment,
  isAdmin,
  roleOptions,
  onRoleChangeClick,
  onDeleteClick,
  roleChanges,
}: MemberTableRowProps) => {
  const { group } = useOutletContext<GroupContextType>();
  const { t } = useTranslation();

  const currentRole =
    roleOptions.find((option) => option.name === member.role) ?? roleOptions[0];

  const changedRole = roleChanges[member.uuid]
    ? roleOptions.find((option) => option.id === roleChanges[member.uuid][1])
    : null;

  const displayRole = changedRole ?? currentRole;

  if (!group) {
    return <Loading />;
  }

  const handleBanishClick = () => {
    onDeleteClick(member);
  };

  const cellStyle: ClassValue =
    "p-2.5 text-left font-medium border-b-2 border-greyBorder";

  return (
    <tr>
      {/* 이름 */}
      <th className={cn(cellStyle, "text-greyDark")}>{member.name}</th>
      {/* 이메일 */}
      <td className={cn(cellStyle, "text-greyDark")}>
        {isAdmin ? (
          member.email
        ) : (
          <LockedSign
            requiredRoleName="admin"
            customText={t("role.adminOnly.view")}
          />
        )}
      </td>
      {/* 역할 변경 */}
      <td className={cn(cellStyle, "min-w-[100px]")}>
        {isAuthorizedForRoleChange ? (
          <>
            <Button
              onClick={() => onRoleChangeClick(member, displayRole)}
              className={cn(
                "flex justify-start items-center pl-3 pr-2.5 py-[5px] bg-greyLight rounded-[5px] w-full",
                changedRole ? "text-primary" : "text-dark",
              )}
            >
              <div className="flex gap-2 grow font-medium items-center">
                <displayRole.icon className="w-5 h-5" />
                <div>{displayRole.value}</div>
              </div>
              <NavArrowRight className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <LockedSign
            requiredRoleName="admin"
            customText={t("role.adminOnly.change")}
          />
        )}
      </td>
      {/* 추방 버튼 */}
      <td className={cn(cellStyle)}>
        {isAuthorizedForMemberBanishment ? (
          <button
            className="underline text-grey text-base font-medium"
            onClick={handleBanishClick}
            aria-label={t("manageGroup.members.banish.banishAriaLabel", {
              name: member.name,
            })}
          >
            {t("manageGroup.members.banish.banish")}
          </button>
        ) : (
          <LockedSign
            requiredRoleName="admin"
            customText={t("role.adminOnly.banish")}
          />
        )}
      </td>
    </tr>
  );
};

export default MemberTableRow;
