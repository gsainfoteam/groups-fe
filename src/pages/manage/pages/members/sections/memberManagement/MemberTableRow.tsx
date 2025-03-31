import Select, { SelectOptionBase } from "@/components/select/Select";
import { MemberResDto } from "@/types/interfaces";
import { useState } from "react";
import { banishMember } from "@/apis/group";
import DeleteConfirmationModal from "../../../groupInfo/components/ConfirmModal";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import { ClassValue } from "clsx";
import { cn } from "@/utils/clsx";
import LockedSign from "@/pages/manage/components/lockedSign";
import { useTranslation } from "react-i18next";

interface MemberProps extends MemberResDto {
  onRoleChange: (memberId: string, prevRole: number, newRole: number) => void;
  isAuthorizedForRoleChange: boolean;
  isAuthorizedForMemberBanishment: boolean;
  isAdmin: boolean;
}

const Member = ({
  uuid,
  name,
  email,
  role,
  onRoleChange,
  isAuthorizedForRoleChange,
  isAuthorizedForMemberBanishment,
  isAdmin,
}: MemberProps) => {
  const { group } = useOutletContext<GroupContextType>();
  const { t } = useTranslation();

  const getRoleOptions = () => [
    { id: 1, value: t("role.admin") },
    { id: 2, value: t("role.manager") },
    { id: 3, value: t("role.member") },
  ];

  const roleOptions = getRoleOptions();

  const defaultRole =
    roleOptions.find((option) => option.value === role) || roleOptions[0];

  const [selectedRole, setSelectedRole] = useState(defaultRole);

  const [isBanishing, setIsBanishing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <p>{t("common.loading")}</p>;
  }

  const handleOptionClick = (option: SelectOptionBase) => {
    setSelectedRole(option);
    onRoleChange(uuid, defaultRole.id, option.id);
  };

  // 추방하기 클릭 시
  const handleBanishClick = () => {
    setIsModalOpen(true);
  };

  // 모달에서 추방 확인 시
  const handleConfirmBanish = async () => {
    setIsModalOpen(false);
    setIsBanishing(true);
    try {
      await banishMember(group.uuid, uuid);
      alert(t("manage.members.banishSuccess", { name }));
    } catch (error) {
      alert(t("manage.members.banishFailed"));
    } finally {
      setIsBanishing(false);
      setIsModalOpen(false);
    }
  };

  // 모달에서 취소 시
  const handleCloseModal = () => setIsModalOpen(false);

  const cellStyle: ClassValue =
    "p-2.5 text-left font-medium border-b-2 border-greyBorder";

  return (
    <tr>
      {/* 이름 */}
      <th className={cn(cellStyle, "text-greyDark")}>{name}</th>
      {/* 이메일 */}
      <td className={cn(cellStyle, "text-greyDark")}>
        {isAdmin ? (
          email
        ) : (
          <LockedSign
            requiredRoleName="admin"
            customText={t("role.adminOnly.view")}
          />
        )}
      </td>
      {/* 역할 */}
      <td className={cn(cellStyle, "min-w-[160px]")}>
        {isAuthorizedForRoleChange ? (
          <Select
            size="small"
            options={roleOptions}
            selectedValue={selectedRole}
            onOptionClick={handleOptionClick}
            className="bg-greyLight rounded-[5px] text-dark dark:text-grey"
          />
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
            aria-label={t("manage.members.banishAriaLabel", { name })}
            disabled={isBanishing}
          >
            {isBanishing
              ? t("manage.members.banishing")
              : t("manage.members.banish")}
          </button>
        ) : (
          <LockedSign
            requiredRoleName="admin"
            customText={t("role.adminOnly.banish")}
          />
        )}
      </td>
      {/* 추방 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmBanish}
        title={t("manage.members.banishWarning")}
        message={t("manage.members.banishConfirm", { name })}
      />
    </tr>
  );
};

export default Member;
