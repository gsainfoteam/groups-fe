import Notion from "@/assets/icons/notion.svg?react";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "@/pages/manage/ManageLayout";
import { useState } from "react";
import Loading from "@/components/loading/Loading";
import { getNotionPage } from "@/apis/notion";

import Input from "@/components/input/Input";
import { changeGroupInfo } from "@/apis/group";
import { useTranslation } from "react-i18next";
import { parseNotionPageId } from "@/utils/notionLinkTester";
import useSWR from "swr";
import NotionWrapper from "@/pages/detail/tabs/intro/NotionWrapper";
import authorityChecker from "@/utils/authorityChecker";
import LockedSign from "../../components/lockedSign";

const ManageNotionLinkPage = () => {
  const { t } = useTranslation();
  const { group, userRole } = useOutletContext<GroupContextType>();
  const [newNotionLink, setNewNotionLink] = useState("");

  if (!group) {
    return <Loading />;
  }

  const isAuthorized = authorityChecker(userRole.authorities, ["GROUP_UPDATE"]);

  const { data: recordMap, isLoading } = useSWR(
    ["notion", (group && group.notionPageId) || ""],
    ([_, notionPageId]) => getNotionPage(notionPageId),
  );

  const handleNotionLinkChange = async () => {
    if (!newNotionLink.trim()) {
      alert(t("manageGroup.notionlink.emptyLink"));
      return;
    }

    // TODO: useGroupNotionSequence.tsx 수정 후 노션 링크 검증 과정 추가
    try {
      const notionPageId = parseNotionPageId(newNotionLink);

      if (!notionPageId) {
        console.error(t("manageGroup.notionlink.console.invalidFormat"));
        return;
      }

      await changeGroupInfo(group.uuid, { notionPageId });

      setNewNotionLink("");
      alert(t("manageGroup.notionlink.success"));
    } catch (error) {
      console.error(t("manageGroup.notionlink.console.changeFailed"), error);
      alert(t("manageGroup.notionlink.error"));
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      {/* 링크 수정 부 */}
      <div className="flex flex-col w-full gap-[30px]">
        <div className="w-full flex-col justify-start items-start gap-[15px] flex">
          {/* 타이틀 */}
          <div className="flex justify-start items-center gap-2.5">
            <Notion className="w-[30px] h-[30px] md:w-10 md:h-10" />
            <div className="text-dark dark:text-grey text-2xl md:text-[28px] font-bold">
              {t("manageGroup.notionlink.title")}
            </div>
          </div>
          {/* 설명 */}
          <div className="flex flex-col">
            <span className="text-dark dark:text-grey text-base">
              {t("manageGroup.notionlink.description.first")}
              <br />
            </span>
            <p className="text-dark dark:text-grey text-base">
              <span className="text-primary text-base">
                {t("manageGroup.notionlink.description.second")}
              </span>
              {t("manageGroup.notionlink.description.third")}
            </p>
          </div>

          {!isAuthorized && <LockedSign requiredRoleName="admin" />}

          {/* 링크 입력 및 제출 */}
          <div className="flex w-full items-center gap-2.5">
            <Input
              width="100%"
              placeholder={t("manageGroup.notionlink.placeholder")}
              buttonValue={t("manageGroup.notionlink.button")}
              value={newNotionLink}
              onChange={(e) => setNewNotionLink(e.target.value)}
              onButtonClick={handleNotionLinkChange}
              disabled={!isAuthorized}
            />
          </div>
        </div>
        {/* 미리보기 */}
        {isLoading ? (
          <div className="h-[300px] p-[25px] bg-[#f5f5f7] rounded-[10px] flex-col justify-center items-center gap-2.5 flex">
            <Loading
              topSpacing="h-0"
              className="w-14 h-14"
              withText={true}
              textClassName="text-lg mt-4"
            />
          </div>
        ) : recordMap ? (
          <div className="w-full overflow-auto bg-white p-4 rounded-xl border border-gray-200">
            <NotionWrapper recordMap={recordMap} />
          </div>
        ) : (
          <div className="text-center text-[#ff6e6e] text-base font-semibold font-['Pretendard']">
            {t("manageGroup.notionlink.loadError")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNotionLinkPage;
