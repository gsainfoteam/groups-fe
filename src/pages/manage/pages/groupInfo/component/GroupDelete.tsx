import { useTranslation } from "react-i18next";
import { useState } from "react";
import ConfirmationModal from "./ConfirmModal";
import { useOutletContext, useNavigate } from "react-router-dom";
import { GroupContextType } from "./../ManageGroupInfoPage";
import Button from "@/components/button/Button";
import { deleteGroup } from "@/apis/group";

const GroupDeleteComponent = () => {
  const { t } = useTranslation();
  const { group } = useOutletContext<GroupContextType>();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  // 그룹 삭제하기 클릭 시
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // 모달에서 삭제 확인 시
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    setIsDeleting(true);
    deleteGroup(group.uuid)
      .then(() => {
        alert("그룹이 성공적으로 삭제되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error("그룹 삭제 중 오류 발생:", error);
        alert("그룹 삭제 중 문제가 발생했습니다.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  // 모달에서 취소 시
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-center gap-5 self-stretch">
        <div className="flex flex-col items-start gap-2.5 flex-1">
          <p className="self-stretch text-primary font-bold text-xl">
            {t("manageGroup.groupInfo.groupDelete.title")}
          </p>
          <p className="self-stretch text-greyDark font-medium text-base">
            {t("manageGroup.groupInfo.groupDelete.description")}
          </p>
        </div>

        <Button
          size="small"
          variant="outlined"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </Button>
      </div>

      {/* 그룹 삭제 확인 모달 */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={"⚠️ 그룹 삭제 경고 ⚠️"}
        message={"정말로 그룹을 삭제하시겠습니까?"}
      />
    </>
  );
};

export default GroupDeleteComponent;
