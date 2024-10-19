import NotionIcon from "@/assets/icons/notion.svg?react";
import Input from "@/components/input/Input";
import Path from "@/types/paths";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/button/Button";
import { NotionRenderer } from "react-notion-x";
import { createGroup, setGroupProfileImage } from "@/apis/group";
import useGroupNotionSequence from "../../hooks/useGroupNotionSequence";

const CreateGroupNotionPage = () => {
  const { t } = useTranslation();
  const {
    setLink,
    isValidLink,
    isInvalidNotionLink,
    isNextButtonValid,
    notionRecordMap,
    notionPageId,
  } = useGroupNotionSequence();
  const navigate = useNavigate();
  const location = useLocation();

  const notionPageIdFromState = location.state?.notionPageId || "";

  useEffect(() => {
    if (notionPageIdFromState) {
      setLink(notionPageIdFromState);
    }
  }, [notionPageIdFromState, setLink]);

  const handlePreviousClick = () => {
    navigate(Path.CreateDescription, {
      state: {
        groupName: location.state.groupName,
        description: location.state.description,
        notionPageId: notionPageId || "",
        profileImageUrl: location.state.profileImageUrl,
      },
    });
  };

  const handleNextClick = async () => {
    try {
      const response = await createGroup({
        name: location.state.groupName,
        description: location.state.description,
        notionPageId: notionPageId || "",
      });

      const groupUuid = response.uuid;

      // if (groupUuid && location.state.profileImageUrl) {
      //   await setGroupProfileImage(groupUuid, location.state.profileImageUrl);
      // }

      navigate(Path.CreateComplete, {
        state: { groupName: location.state.groupName },
      });
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <>
      <div className={"w-full md:h-[500px] max-w-[685px]"}>
        <section className={"flex flex-col gap-[15px] mt-20"}>
          <div className={"flex items-center gap-[10px]"}>
            <NotionIcon className={"m-0"} width={38} height={39} />

            <h2 className={"create-subtitle"}>
              {t("createGroup.notion.title")}
            </h2>
          </div>
          <p>
            <Trans i18nKey={"createGroup.notion.description"} />
          </p>

          <Input
            placeholder={t("createGroup.notion.placeholder")}
            type={"text"}
            onChange={(e) => setLink(e.target.value)}
            errorText={
              isInvalidNotionLink && isValidLink
                ? t("createGroup.notion.exceptions.customDomainNotSupported")
                : isInvalidNotionLink
                  ? t("createGroup.notion.exceptions.invalidNotionLink")
                  : undefined
            }
          />
        </section>
      </div>

      {notionRecordMap && Object.keys(notionRecordMap).length > 0 && (
        <NotionRenderer
          recordMap={notionRecordMap}
          fullPage={true}
          darkMode={false}
        />
      )}

      <div className={"flex gap-[10px] w-full mt-[30px] justify-center"}>
        <Button
          variant={"outlined"}
          className="w-full py-[15px] text-[18px] md:w-[240px]"
          size="cta"
          onClick={handlePreviousClick}
        >
          {t("createGroup.previous")}
        </Button>
        <Button
          variant={isNextButtonValid ? "emphasized" : "outlined"}
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

export default CreateGroupNotionPage;
