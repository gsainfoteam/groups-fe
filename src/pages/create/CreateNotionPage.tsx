import NotionIcon from "@/assets/icons/notion.svg?react";
import Input from "@/components/input/Input";
import Path from "@/types/paths";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useGroupNotionSequence from "./hooks/useGroupNotionSequence";

import Button from "@/components/button/Button";
import {
  GROUP_CREATION_NAME_ANIMATION_CONTAINER_VARIANT as CONTAINER_VARIANT,
  GROUP_CREATION_NAME_ANIMATION_ITEM_VARIANT as ITEM_VARIANT,
} from "@/pages/create/animations/animations";
import { NotionRenderer } from "react-notion-x";

const CreateNotionPage = () => {
  const { t } = useTranslation();
  const {
    setLink,
    isValidLink,
    isInvalidNotionLink,
    isNextButtonValid,
    notionRecordMap,
  } = useGroupNotionSequence();
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false);

  const handlePreviousClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(Path.CreateDescription);
    }, 600);
  };

  const handleNextClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(Path.CreateComplete);
    }, 600);
  };

  return (
    <>
      <div className={"w-full md:h-[500px] max-w-[685px]"}>
        <AnimatePresence>
          {!isExiting && (
            <motion.section
              className={"flex flex-col gap-[15px] mt-20"}
              variants={CONTAINER_VARIANT}
              animate="visible"
              exit="out"
            >
              <motion.div
                className={"flex items-center gap-[10px]"}
                variants={ITEM_VARIANT}
              >
                <NotionIcon className={"m-0"} width={38} height={39} />

                <motion.h2 className={"create-subtitle"}>
                  {t("createGroup.notion.title")}
                </motion.h2>
              </motion.div>
              <motion.p variants={ITEM_VARIANT}>
                <Trans i18nKey={"createGroup.notion.description"} />
              </motion.p>

              <Input
                placeholder={t("createGroup.notion.placeholder")}
                type={"text"}
                onChange={(e) => setLink(e.target.value)}
                errorText={
                  isInvalidNotionLink && isValidLink
                    ? t(
                        "createGroup.notion.exceptions.customDomainNotSupported",
                      )
                    : isInvalidNotionLink
                      ? t("createGroup.notion.exceptions.invalidNotionLink")
                      : undefined
                }
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {notionRecordMap && <NotionRenderer recordMap={notionRecordMap} />}

      <div className={"flex gap-[10px] w-full mt-[30px] justify-center"}>
        <Button
          variant={"outlined"}
          className="w-full py-[15px] text-[18px] md:w-[240px]"
          size="cta"
          onClick={handlePreviousClick}
        >
          {t("createGroup.previous")}
        </Button>{" "}
        <Button
          variant={isNextButtonValid ? "contained" : "outlined"}
          className="w-full py-[15px] text-[18px] md:w-[240px]"
          size="cta"
          onClick={handleNextClick}
        >
          {isNextButtonValid ? t("createGroup.next") : t("createGroup.skip")}
        </Button>
      </div>
    </>
  );
};

export default CreateNotionPage;
