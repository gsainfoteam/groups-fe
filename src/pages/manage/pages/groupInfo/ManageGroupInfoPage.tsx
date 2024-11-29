import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { useOutletContext } from "react-router-dom";
import { GroupInfo } from "@/types/interfaces";
import { getGroup, setGroupProfileImage } from "@/apis/group";
import { useState } from "react";
import { deleteGroup } from "@/apis/group";
import DeleteConfirmationModal from "./DeleteConfirmModal";
import { changeGroupInfo } from "@/apis/group";

export type GroupContextType = {
  group: GroupInfo | null;
  setGroup: React.Dispatch<React.SetStateAction<GroupInfo | null>>;
};

const ManageGroupInfoPage: React.FC = () => {
  const { group, setGroup } = useOutletContext<GroupContextType>();
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 진행 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDes, setNewGroupDes] = useState("");

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  // 그룹 프로필 사진 변경 클릭 시
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEditingProfileImage(true); // 편집 모드 활성화
    }
  };
  

  // 변경 확정 클릭 시
  const handleConfirmChange = async () => {
    if (newProfileImage && group.uuid) {
      setIsUploading(true);
      try {
        await setGroupProfileImage(group.uuid, newProfileImage);
        const updatedGroup = await getGroup(group.uuid);
        setGroup(updatedGroup);
        setIsUploading(false);
        setIsEditingProfileImage(false);
        setNewProfileImage(null);
        setPreviewImage(null);
        alert("프로필 사진이 성공적으로 변경되었습니다!");
      } catch (error) {
        setIsUploading(false);
        alert("프로필 사진 변경 중 문제가 발생했습니다.");
      }
    }
  };

  // 그룹명 or 그룹 설명 변경 클릭 시
  const handleGroupNameChange = async () => {
    if(!newGroupName.trim()) {
      alert("새 그룹명을 입력해주세요.");
      return;
    }

    try {
      await changeGroupInfo(group.uuid, { name: newGroupName });
      const updatedGroup = await getGroup(group.uuid);
      setGroup(updatedGroup);
      setNewGroupName("");
      alert("그룹명이 변경 되었습니다.");
    } catch(error) {
      console.log("그룹명 변경 실패");
      alert("그룹명 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleGroupDesChange = async () => {
    if(!newGroupDes.trim()) {
      alert("새 그룹 설명을 입력해주세요.");
      return;
    }

    try {
      await changeGroupInfo(group.uuid, { description: newGroupDes });
      const updatedGroup = await getGroup(group.uuid);
      setGroup(updatedGroup);
      setNewGroupDes("");
      alert("그룹 설명이 변경 되었습니다.");
    } catch(error) {
      console.log("그룹 설명 변경 실패");
      alert("그룹 설명 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 취소 버튼 클릭 시
  const handleCancelChange = () => {
    setIsEditingProfileImage(false);
    setNewProfileImage(null);
    setPreviewImage(null);
  };

  // 삭제하기 클릭 시
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
        window.location.href = "/";
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
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      <div className="flex flex-col items-center gap-[27px] self-stretch">
        <div className="flex w-[140px] h-[140px] md:w-[200px] md:h-[200px] justify-center items-center rounded-[100px] border border-light-primary">
        {isEditingProfileImage ? (
            previewImage ? (
              <img
                src={previewImage}
                alt="새 프로필 미리보기"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-greyDark">새 이미지를 선택하세요</span>
            )
          ) : group.profileImageUrl ? (
            <img
              src={group.profileImageUrl}
              alt="그룹 프로필"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-greyDark">이미지 없음</span>
          )}
        </div>

        {isUploading ? (
          <p className="text-greyDark">프로필 사진을 변경하는 중입니다...</p>
        ) : isEditingProfileImage ? (
          <div className="flex gap-4">
            <Button size="cta" variant="emphasized" onClick={handleConfirmChange}>
              변경 확정
            </Button>
            <Button size="cta" variant="outlined" onClick={handleCancelChange}>
              취소
            </Button>
          </div>
        ) : (
          <div>
            <Button
              size="cta"
              variant="outlined"
              onClick={() => document.getElementById("profileImageUpload")?.click()}
            >
              그룹 프로필 사진 변경
            </Button>
            <input
              type="file"
              id="profileImageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <p className="text-2xl font-bold text-dark">그룹명</p>
        <p className="text-base font-medium text-dark">그룹명 변경</p>

        <Input
          width="100%"
          placeholder={group.name}
          buttonValue="변경"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          onButtonClick={handleGroupNameChange}
        />
      </div>

      <div className="flex w-full flex-col justify-center items-start gap-4">
        <p className="text-2xl font-bold text-dark">그룹 간단 소개</p>
        <p className="text-base font-medium text-dark">그룹 간단 소개 변경</p>

        <div className="w-full flex flex-col items-end gap-2.5">
          <div className="flex flex-col w-full gap-1.5">
            <textarea
              className="h-[100px] w-full px-4 py-2.5 rounded-xl border border-primary border-[1.5px]"
              placeholder={group.description || "그룹 설명 없음"}
              value={newGroupDes}
              onChange={(e) => setNewGroupDes(e.target.value)}
            ></textarea>
            <p className="flex w-full justify-end text-greyDark text-xs">
              {(group.description?.length || 0)}/500
            </p>
          </div>

          <Button
            size="big"
            variant="emphasized"
            className="rounded-[10px]" 
            onClick={handleGroupDesChange}
          >
            변경
          </Button>
        </div>
      </div>

      <div className="w-full p-5 flex flex-col justify-center items-start gap-5 rounded-xl border-2 border-greyBorder">
        <div className="flex items-center gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2.5 flex-1">
            <p className="self-stretch text-primary font-bold text-xl">
              그룹 삭제
            </p>
            <p className="self-stretch text-greyDark font-medium text-base">
              기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 본
              작업은 되돌릴 수 없습니다.
            </p>
          </div>

          <Button
            size="small"
            variant="outlined"
            onClick={handleDeleteClick}
            disabled={isDeleting} // 삭제 진행 중이면 버튼 비활성화
          >
            {isDeleting ? "삭제 중..." : "삭제하기"}
          </Button>
        </div>

        <div className="w-full h-[1.5px] bg-greyBorder" />

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

          <Button size="small" variant="outlined">
            나가기
          </Button>
        </div>
      </div>

      <div className="flex justify-center self-stretch">
        <Button size="cta" variant="emphasized" className="w-full md:w-60">
          완료
        </Button>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManageGroupInfoPage;
