import Button from "@/components/button/Button";
import Path from "@/types/paths";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import useGroupDescriptionSequence from "./hooks/useGroupDescriptionSequence";

import {
  GROUP_CREATION_NAME_ANIMATION_CONTAINER_VARIANT as CONTAINER_VARIANT,
  GROUP_CREATION_NAME_ANIMATION_ITEM_VARIANT as ITEM_VARIANT,
} from "@/pages/create/animations/animations";

const CreateDescriptionPage = () => {
  const { t } = useTranslation();
  const { descriptionLength, setDescription, isNextButtonValid, description } =
    useGroupDescriptionSequence();

  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const groupDesFromState = location.state?.description || "";

  useEffect(() => {
    if (groupDesFromState) {
      setDescription(groupDesFromState);
    }
  }, [groupDesFromState, setDescription]);

  const handlePreviousClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(Path.CreateName, {
        state: {
          groupName: location.state.groupName,
          description: description || "",
          notionPageId: location.state?.notionPageId || "",
          profileImageUrl: location.state.profileImageUrl,
        },
      });
    }, 600);
  };

  const handleNextClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(Path.CreateNotion, {
        state: {
          groupName: location.state.groupName,
          description: description,
          notionPageId: location.state?.notionPageId || "",
          profileImageUrl: location.state.profileImageUrl,
        },
      });
    }, 600);
  };

  return (
    <>
      <div className={"w-full max-w-[600px] md:h-[500px] flex"}>
        <AnimatePresence>
          {!isExiting && (
            <motion.section
              variants={CONTAINER_VARIANT}
              animate="visible"
              exit="out"
              className={"w-full flex flex-col mt-20 gap-[15px]"}
            >
              <motion.h2 className={"create-subtitle"} variants={ITEM_VARIANT}>
                {t("createGroup.description.title")}
              </motion.h2>
              <motion.p variants={ITEM_VARIANT}>
                <Trans i18nKey={"createGroup.description.description"} />
              </motion.p>

              <motion.textarea
                className={
                  "w-full rounded-[10px] border-[1.5px] border-solid border-primary py-1 pl-4 pr-[10px] bg-white"
                }
                placeholder={t("createGroup.description.placeholder")}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variants={ITEM_VARIANT}
              />
              <motion.p
                className={"text-xs text-right text-greyDark mt-[-10px]"}
                variants={ITEM_VARIANT}
              >
                {descriptionLength}/200
              </motion.p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <div className={"flex gap-[10px] w-full mt-[30px] justify-center"}>
        <Button
          variant={"outlined"}
          className="w-full py-[15px] text-[18px] max-w-[240px]"
          size="cta"
          onClick={handlePreviousClick}
        >
          {t("createGroup.previous")}
        </Button>
        <Button
          variant={isNextButtonValid ? "emphasized" : "disabled"}
          className="w-full py-[15px] text-[18px] max-w-[240px]"
          size="cta"
          disabled={!isNextButtonValid}
          onClick={handleNextClick}
        >
          {t("createGroup.next")}
        </Button>
      </div>
    </>
  );
};

export default CreateDescriptionPage;
