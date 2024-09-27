import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  GROUP_CREATION_NAME_ANIMATION_CONTAINER_VARIANT as CONTAINER_VARIANT,
  GROUP_CREATION_NAME_ANIMATION_ITEM_VARIANT as ITEM_VARIANT,
} from "@/pages/create/animations/animations";

import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Path from "@/types/Paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useGroupProfileSequence from "./hooks/useGroupProfileSequence";
import isValidImage from "./utils/isValidImage";

const CreateGroupSequenceName = () => {
  const { t } = useTranslation();
  const {
    setName,
    isNameExists,
    isNextButtonValid,
    profileImageUrl,
    setProfileImage,
    debouncedName,
  } = useGroupProfileSequence();

  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();
  const handleNextClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(Path.CreateDescription, { state: { groupName: debouncedName } });
    }, 600);
  };

  return (
    <>
      <div className="w-full md:flex md:h-[500px] md:flex-col md:items-center max-w-[685px]">
        <AnimatePresence>
          {!isExiting && (
            <motion.section
              variants={CONTAINER_VARIANT}
              animate="visible"
              exit="out"
              className={[
                "md:flex md:h-[500px] md:p-0 md:gap-[45px] items-center",
                "w-full py-[60px]",
              ].join(" ")}
            >
              <motion.div className={"flex flex-col gap-[27px]"}>
                <motion.img
                  src={profileImageUrl || GroupProfileDefault}
                  width={200}
                  height={200}
                  className={"mx-5 object-cover aspect-square rounded-full"}
                />

                <motion.label variants={ITEM_VARIANT}>
                  <motion.input
                    type={"file"}
                    accept={"image/*"}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && isValidImage(file)) {
                        setProfileImage(file);
                      }
                    }}
                    className={"hidden"}
                  />

                  <motion.p
                    className={
                      "box-content border border-primary rounded-[10px] text-primary text-center text-lg py-[10px]"
                    }
                  >
                    {t("createGroup.name.chooseGroupProfile")}
                  </motion.p>
                </motion.label>
              </motion.div>

              <motion.div className={"flex flex-col flex-grow mb-10"}>
                <motion.h2
                  variants={ITEM_VARIANT}
                  className="mb-[20px] create-subtitle"
                >
                  {t("createGroup.name.enterGroupName")}
                </motion.h2>

                <motion.div variants={ITEM_VARIANT}>
                  <Input
                    placeholder={t("createGroup.name.placeholder")}
                    width="100%"
                    className="w-full"
                    title={t("createGroup.name.groupName")}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    errorText={
                      isNameExists
                        ? t("createGroup.name.exceptions.groupNameAlreadyExist")
                        : undefined
                    }
                  />
                </motion.div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      <Button
        variant={isNextButtonValid ? "contained" : "disabled"}
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        isBig
        disabled={!isNextButtonValid}
        onClick={handleNextClick}
      >
        {t("createGroup.next")}
      </Button>
    </>
  );
};

export default CreateGroupSequenceName;
