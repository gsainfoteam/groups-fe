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
import Loading from "@/components/loading/Loading";

interface MemberProps extends MemberResDto {
  onRoleChange: (memberId: string, prevRole: number, newRole: number) => void;
  isAuthorizedForRoleChange: boolean;
  isAuthorizedForMemberBanishment: boolean;
  isAdmin: boolean;
}

export const roleOptions = [
  { id: 1, value: "관리자" },
  { id: 2, value: "매니저" },
  { id: 3, value: "일반" },
];

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

  const defaultRole =
    roleOptions.find((option) => option.value === role) || roleOptions[0];

  const [selectedRole, setSelectedRole] = useState(defaultRole);

  const [isBanishing, setIsBanishing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <Loading />;
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
      alert(`멤버 ${name}의 추방이 성공적으로 이뤄졌습니다.`);
    } catch (error) {
      alert("추방에 실패했습니다. 다시 시도해주세요.");
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
            customText="관리자만 볼 수 있습니다."
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
            customText="관리자만 변경할 수 있습니다."
          />
        )}
      </td>
      {/* 추방 버튼 */}
      <td className={cn(cellStyle)}>
        {isAuthorizedForMemberBanishment ? (
          <button
            className="underline text-grey text-base font-medium"
            onClick={handleBanishClick}
            aria-label={`${name} 멤버 추방하기`}
            disabled={isBanishing}
          >
            {isBanishing ? "추방 중..." : "추방하기"}
          </button>
        ) : (
          <LockedSign
            requiredRoleName="admin"
            customText="관리자만 추방할 수 있습니다."
          />
        )}
      </td>
      {/* 추방 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmBanish}
        title="⚠️ 추방 경고 ⚠️"
        message={`정말로 멤버 ${name}을/를 추방하시겠습니까?`}
      />
    </tr>
  );
};

export default Member;
