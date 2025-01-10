import { useEffect, useRef } from "react";

import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Path from "@/types/paths";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import useGroupProfileSequence from "../../hooks/useGroupProfileSequence";
import isValidImage from "../../utils/isValidImage";

const CreateGroupName = () => {
  const { t } = useTranslation();
  const {
    name,
    setName,
    debouncedName,
    isNameExists,
    isNextButtonValid,
    profileImageUrl,
    setProfileImage,
    setProfileImageUrl,
  } = useGroupProfileSequence();

  const navigate = useNavigate();
  const location = useLocation();
  const groupNameFromState = location.state?.groupName || "";
  const profileImageFromState = location.state?.profileImageUrl || "";

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (groupNameFromState) {
      setName(groupNameFromState);
    }
  }, [groupNameFromState, setName]);

  useEffect(() => {
    if (profileImageFromState) {
      setProfileImageUrl(profileImageFromState);
    }
  }, [profileImageFromState, setProfileImageUrl]);

  const handleNextClick = () => {
    navigate(Path.CreateDescription, {
      state: {
        groupName: debouncedName,
        description: location.state?.description || "",
        notionPageId: location.state?.notionPageId || "",
        profileImageUrl: profileImageUrl || profileImageFromState,
      },
    });
  };

  return (
    <>
      <div className="w-full md:flex md:h-[500px] md:flex-col md:items-center max-w-[685px]">
        <section
          className={[
            "md:flex md:h-[500px] md:p-0 md:gap-[45px] items-center",
            "w-full py-[60px]",
          ].join(" ")}
        >
          <div
            className={
              "flex flex-col gap-[27px] items-center w-full md:w-auto mb-[60px] md:mb-0"
            }
          >
            <img
              src={profileImageUrl || GroupProfileDefault}
              width={200}
              height={200}
              className={"mx-5 object-cover aspect-square rounded-full"}
            />

            <div>
              <input
                ref={fileInputRef}
                type={"file"}
                accept={"image/*"}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && isValidImage(file)) {
                    setProfileImage(file); // Only set a file here, not a URL
                  }
                }}
                className={"hidden"}
              />

              <Button
                variant="contained"
                size="big"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                {t("createGroup.name.chooseGroupProfile")}
              </Button>
            </div>
          </div>

          <div className={"flex flex-col flex-grow mb-10"}>
            <h2 className="mb-[20px] create-subtitle">
              {t("createGroup.name.enterGroupName")}
            </h2>

            <div>
              <Input
                placeholder={t("createGroup.name.placeholder")}
                width="100%"
                className="w-full"
                title={t("createGroup.name.groupName")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                errorText={
                  isNameExists
                    ? t("createGroup.name.exceptions.groupNameAlreadyExist")
                    : undefined
                }
              />
            </div>
          </div>
        </section>
      </div>

      <Button
        variant={isNextButtonValid ? "emphasized" : "disabled"}
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        size="cta"
        disabled={!isNextButtonValid}
        onClick={handleNextClick}
      >
        {t("createGroup.next")}
      </Button>
    </>
  );
};

export default CreateGroupName;
