import Select, { SelectOptionBase } from "@/components/select/Select";
import { MemberResDto } from "@/types/interfaces";
import { useState } from "react";
import DeleteConfirmationModal from "../groupInfo/component/ConfirmModal";
import { leavingGroup } from "@/apis/group";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../groupInfo/ManageGroupInfoPage";

const Member = ({ uuid, name, email, role }: MemberResDto) => {
  const { group } = useOutletContext<GroupContextType>();

  const roleOptions = [
    { id: 1, value: "관리자" },
    { id: 2, value: "매니저" },
    { id: 3, value: "일반" },
  ];

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
    console.log("선택한 역할:", option.value);
  };

  // 그룹 삭제하기 클릭 시
  const handleBanishClick = () => {
    setIsModalOpen(true);
  };

  // 모달에서 삭제 확인 시
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
      setIsModalOpen(false); // 모달 닫기
    }
  };

  // 모달에서 취소 시
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-[50px] justify-start items-center">
      {/* 이름 */}
      <div className="flex p-2.5 w-[62px] md:w-[62px] h-[50px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyBorder">
        {name}
      </div>
      {/* 이메일 */}
      <div className="flex p-2.5 w-[232px] md:w-[232px] h-[50px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyBorder">
        {email}
      </div>
      {/* 역할 */}
      <div className="flex justify-start p-2.5 w-[220px] md:w-[220px] h-[50px] border-b-2 border-greyBorder">
        <Select
          size="small"
          options={roleOptions}
          selectedValue={selectedRole}
          onOptionClick={handleOptionClick}
          className="flex w-full bg-greyLight rounded-[5px] justify-start items-center gap-2.5 text-dark"
        />
      </div>
      {/* 추방 버튼 */}
      <div className="flex p-2.5 w-[76px] md:w-[76px] h-[50px] justify-start items-center border-b-2 border-greyBorder">
        <p
          className="underline text-grey text-base font-medium"
          onClick={handleBanishClick}
        >
          {isBanishing ? "추방 중..." : "추방하기"}
        </p>
      </div>
      {/* 추방 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmBanish}
        title="⚠️ 추방 경고 ⚠️"
        message={`정말로 멤버 ${name}을/를 추방하시겠습니까?`}
      />
    </div>
  );
};

export default Member;
