import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import { setGroupProfileImage } from "@/apis/group";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import authorityChecker from "@/utils/authorityChecker";
import { RoleAuthorities, RoleNames } from "@/types/interfaces";
import LockedSign from "@/pages/manage/components/lockedSign";
interface ImageSectionProps extends GroupContextType {}

const ImageSection = ({ group, userRole }: ImageSectionProps) => {
  const { t } = useTranslation();
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const isAuthorized = authorityChecker(userRole.authorities, [
    RoleAuthorities.GROUP_UPDATE,
  ]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      setPreviewImage(url);
      setIsEditingProfileImage(true);
    }
  };

  const handleConfirmChange = async () => {
    if (newProfileImage && group.uuid) {
      setIsUploading(true);
      try {
        await setGroupProfileImage(group.uuid, newProfileImage);
        alert("프로필 사진이 성공적으로 변경되었습니다!");
      } catch {
        alert("프로필 사진 변경 중 문제가 발생했습니다.");
      } finally {
        setIsUploading(false);
        setIsEditingProfileImage(false);
        setNewProfileImage(null);
        setPreviewImage(null);
      }
    }
  };

  const handleCancelChange = () => {
    setIsEditingProfileImage(false);
    setNewProfileImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-[140px] h-[140px] md:w-[200px] md:h-[200px] justify-center items-center rounded-full border border-light-primary">
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
          <Button size="big" variant="emphasized" onClick={handleConfirmChange}>
            변경 확정
          </Button>
          <Button size="big" variant="outlined" onClick={handleCancelChange}>
            취소
          </Button>
        </div>
      ) : (
        <div>
          <Button
            size="big"
            variant={isAuthorized ? "contained" : "disabled"}
            disabled={!isAuthorized}
            onClick={() =>
              document.getElementById("profileImageUpload")?.click()
            }
          >
            {t("manageGroup.groupInfo.groupPic.title")}
          </Button>
          <input
            type="file"
            id="profileImageUpload"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </div>
      )}

      {!isAuthorized && <LockedSign requiredRoleName={RoleNames.ADMIN} />}
    </div>
  );
};

export default ImageSection;
