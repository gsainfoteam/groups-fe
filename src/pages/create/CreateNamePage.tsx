import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  GROUP_CREATION_NAME_ANIMATION_CONTAINER_VARIANT as CONTAINER_VARIANT,
  GROUP_CREATION_NAME_ANIMATION_ITEM_VARIANT as ITEM_VARIANT,
} from "@/pages/create/animations/animations";

import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useGroupNameValidation from "./components/useGroupNameValidation";
const CreateGroupSequenceName = () => {
  const { t } = useTranslation();
  const { setGroupName, isGroupNameExists, isNextButtonValid } =
    useGroupNameValidation();

  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();
  const handleNextClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate("/create/complete");
    }, 600);
  };

  return (
    <>
      <div className="w-full md:flex md:h-[500px] md:flex-col md:items-center">
        <AnimatePresence>
          {!isExiting && (
            <motion.section
              variants={CONTAINER_VARIANT}
              animate="visible"
              exit="out"
              className={[
                "md:flex md:h-[500px] md:w-[400px] md:flex-col md:justify-center md:p-0",
                "w-full py-[60px]",
              ].join(" ")}
            >
              <motion.h2
                variants={ITEM_VARIANT}
                className="mb-[20px] text-2xl font-bold md:text-[28px]"
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
                    setGroupName(e.target.value);
                  }}
                  errorText={
                    isGroupNameExists
                      ? t("createGroup.name.exceptions.groupNameAlreadyExist")
                      : undefined
                  }
                />
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
