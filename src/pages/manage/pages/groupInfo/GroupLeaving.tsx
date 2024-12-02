import React, { useState } from "react";
import DeleteConfirmationModal from "./ConfirmModal";
import { getUserInfo } from "@/apis/auth";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "./ManageGroupInfoPage";
import Button from "@/components/button/Button";
import { leavingGroup } from "@/apis/group";

const GroupLeaveComponent = () => {
  const { group, setGroup } = useOutletContext<GroupContextType>();

  const [isLeaving, setIsLeaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  // 삭제하기 클릭 시
  const handleLeaveClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLeave = async () => {
    setIsModalOpen(false);
    setIsLeaving(true);
    try {
      const userInfo = await getUserInfo();
      const userUuid = userInfo.uuid; // 사용자 UUID 추출
      await leavingGroup(group.uuid, userUuid);
      alert("그룹에서 성공적으로 나갔습니다.");
    } catch (error) {
      alert("그룹 나가기에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLeaving(false);
      setIsModalOpen(false); // 모달 닫기
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-center gap-5 self-stretch">
        <div className="flex flex-col items-start gap-2.5 flex-1">
            <p className="self-stretch text-primary font-bold text-xl">
                그룹 나가기
            </p>
            <p className="self-stretch text-greyDark font-medium text-base">
                기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다.
                그룹을 나간 뒤에도 초대된다면 다시 그룹에 참여할 수 있습니다.
            </p>
        </div>

        <Button
            size="small"
            variant="outlined"
            onClick={handleLeaveClick}
            disabled={isLeaving} // 나가기 진행 중이면 버튼 비활성화
        >
            {isLeaving ? "나가는 중..." : "나가기"}
        </Button>
      </div>

      {/* 그룹 나가기 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleLeaveClick}
        title="⚠️ 그룹 나가기 경고 ⚠️"
        message="정말로 그룹에서 나가시겠습니까?"
      />
    </>
  );
};

export default GroupLeaveComponent;
