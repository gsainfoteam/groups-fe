import NotionIcon from "@/assets/icons/notion.svg?react";
import Input from "@/components/input/Input";
import Path from "@/types/paths";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/components/button/Button";
import { NotionRenderer } from "react-notion-x";
import { createGroup, createRole, setGroupProfileImage } from "@/apis/group";
import useGroupNotionSequence from "../../hooks/useGroupNotionSequence";
import { dataUrlToFile } from "@/utils/dataURLtoFile";
import { useGroupCreation } from "../../context/GroupCreationContext";
import NotionWrapper from "@/pages/detail/tabs/intro/NotionWrapper";
import { RolePermissions } from "@/types/interfaces";
const CreateGroupNotionPage = () => {
  const { t } = useTranslation();
  const { state, updateState } = useGroupCreation();
  const {
    setLink,
    isValidLink,
    isInvalidNotionLink,
    isNextButtonValid,
    notionRecordMap,
    notionPageId,
  } = useGroupNotionSequence();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.notionPageId) {
      setLink(state.notionPageId);
    }
  }, [state.notionPageId, setLink]);

  const handlePreviousClick = () => {
    updateState({
      notionPageId: notionPageId || "",
    });
    navigate(Path.CreateDescription);
  };

  const handleNextClick = async () => {
    try {
      const response = await createGroup({
        name: state.groupName,
        description: state.description,
        notionPageId: notionPageId || "",
      });

      const groupUuid = response.uuid;

      try {
        const filename = `profile_${Date.now()}`;
        const image = await dataUrlToFile(state.profileImageUrl, filename);

        if (groupUuid && state.profileImageUrl) {
          await setGroupProfileImage(groupUuid, image);
        }
      } catch (error) {
        console.error("profile image upload failed:", error);
        // TODO: 사용자에게 이미지 업로드 실패 알림
      }

      const manager = {
        name: "manager",
        permissions: [
          RolePermissions.MEMBER_UPDATE,
          RolePermissions.MEMBER_DELETE,
          RolePermissions.ROLE_UPDATE,
          RolePermissions.ROLE_GRANT,
        ],
      };
      const member = {
        name: "member",
        permissions: [],
      };
      try {
        await createRole(groupUuid, manager.name, manager.permissions);
        await createRole(groupUuid, member.name, member.permissions);
      } catch (error) {
        console.error("Failed to create role:", error);
      }

      updateState({
        groupUuid,
      });
      navigate(Path.CreateComplete);
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
        <NotionWrapper recordMap={notionRecordMap} />
        //there is some url that notionrenderer cannot hanldle,TODO: fix it
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
