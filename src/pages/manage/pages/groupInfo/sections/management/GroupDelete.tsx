import { useTranslation } from "react-i18next";
import { useState } from "react";

import { useOutletContext, useNavigate } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import Button from "@/components/button/Button";
import { deleteGroup } from "@/apis/group";
import DeleteConfirmationModal from "../../components/ConfirmModal";
import authorityChecker from "@/utils/authorityChecker";
import LockedSign from "@/pages/manage/components/lockedSign";
import Loading from "@/components/loading/Loading";

const GroupDeleteComponent = () => {
  const { t } = useTranslation();
  const { group, userRole } = useOutletContext<GroupContextType>();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!group) {
<<<<<<< Updated upstream
    return <p>데이터를 불러오는 중...</p>;
=======
    return <Loading />;
>>>>>>> Stashed changes
  }

  const isAuthorized = authorityChecker(userRole.authorities, ["GROUP_DELETE"]);

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
      <div className="flex items-center gap-5 self-stretch flex-wrap md:flex-nowrap">
        <div className="flex flex-col items-start gap-2.5 md:flex-1">
          <h4 className="self-stretch text-primary font-semibold text-xl">
            {t("manageGroup.groupInfo.groupDelete.title")}
          </h4>
          {!isAuthorized && <LockedSign requiredRoleName="admin" />}

          <p className="self-stretch text-greyDark text-base">
            {t("manageGroup.groupInfo.groupDelete.description")}
          </p>
        </div>

        <Button
          size="small"
          variant={isAuthorized ? "outlined" : "disabled"}
          onClick={handleDeleteClick}
          disabled={isDeleting || !isAuthorized}
        >
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </Button>
      </div>

      {/* 그룹 삭제 확인 모달 */}
      <DeleteConfirmationModal
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
