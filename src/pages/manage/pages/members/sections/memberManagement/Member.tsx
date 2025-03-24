import Select, { SelectOptionBase } from "@/components/select/Select";
import { MemberResDto } from "@/types/interfaces";
import { useState } from "react";
import DeleteConfirmationModal from "../../../groupInfo/components/ConfirmModal";
import { leavingGroup } from "@/apis/group";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";

interface MemberProps extends MemberResDto {
  onRoleChange: (memberId: string, prevRole: number, newRole: number) => void;
}

export const roleOptions = [
  { id: 1, value: "관리자" },
  { id: 2, value: "매니저" },
  { id: 3, value: "일반" },
];

const Member = ({ uuid, name, email, role, onRoleChange }: MemberProps) => {
  const { group } = useOutletContext<GroupContextType>();

  const defaultRole =
    roleOptions.find((option) => option.value === role) || roleOptions[0];

  const [selectedRole, setSelectedRole] = useState(defaultRole);

  const [isBanishing, setIsBanishing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
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
      await leavingGroup(group.uuid, uuid);
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

  return (
    <tr>
      {/* 이름 */}
      <th className="p-2.5 text-left text-greyDark text-base font-medium border-b-2 border-greyBorder">
        {name}
      </th>
      {/* 이메일 */}
      <td className="p-2.5 text-left text-greyDark text-base font-medium border-b-2 border-greyBorder">
        {email}
      </td>
      {/* 역할 */}
      <td className="p-2.5 min-w-[250px] text-left border-b-2 border-greyBorder">
        <Select
          size="small"
          options={roleOptions}
          selectedValue={selectedRole}
          onOptionClick={handleOptionClick}
          className="bg-greyLight rounded-[5px] text-dark dark:text-grey"
        />
      </td>
      {/* 추방 버튼 */}
      <td className="p-2.5 text-left border-b-2 border-greyBorder">
        <button
          className="underline text-grey text-base font-medium"
          onClick={handleBanishClick}
          aria-label={`${name} 멤버 추방하기`}
          disabled={isBanishing}
        >
          {isBanishing ? "추방 중..." : "추방하기"}
        </button>
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
