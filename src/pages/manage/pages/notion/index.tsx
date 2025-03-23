import Notion from "@/assets/icons/notion.svg?react";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../groupInfo";
import { useState } from "react";
import Loading from "@/components/loading/Loading";
import { getNotionPage } from "@/apis/notion";

import Input from "@/components/input/Input";
import { changeGroupInfo, getGroup } from "@/apis/group";
import { useTranslation } from "react-i18next";
import { parseNotionPageId } from "@/utils/notionLinkTester";
import useSWR from "swr";
import NotionWrapper from "@/pages/detail/tabs/intro/NotionWrapper";

const ManageNotionLinkPage = () => {
  const { t } = useTranslation();
  const { group, setGroup } = useOutletContext<GroupContextType>();
  const [newNotionLink, setNewNotionLink] = useState("");

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  const {
    data: recordMap,
    isLoading,
    error: recordMapError,
  } = useSWR(
    ["notion", (group && group.notionPageId) || ""],
    ([_, notionPageId]) => getNotionPage(notionPageId),
  );

  const handleNotionLinkChange = async () => {
    if (!newNotionLink.trim()) {
      alert("새 노션 링크를 입력해주세요.");
      return;
    }

    // TODO: useGroupNotionSequence.tsx 수정 후 노션 링크 검증 과정 추가
    try {
      const notionPageId = parseNotionPageId(newNotionLink);

      if (!notionPageId) {
        console.error("노션 링크의 형식이 잘못되었습니다.");
        return;
      }

      await changeGroupInfo(group.uuid, { notionPageId });
      const updatedGroup = await getGroup(group.uuid);
      setGroup(updatedGroup);
      setNewNotionLink("");
      alert("노션 링크가 변경 되었습니다.");
    } catch (error) {
      console.error("노션 링크 변경 실패:", error);
      alert("노션 링크 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      {/* 링크 수정 부 */}
      <div className="flex flex-col w-full gap-[30px]">
        <div className="w-full flex-col justify-start items-start gap-[15px] flex">
          {/* 타이틀 */}
          <div className="flex justify-start items-center gap-2.5 inline-flex">
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
          {/* 링크 입력 및 제출 */}
          <div className="flex w-full items-center gap-2.5">
            <Input
              width="100%"
              placeholder={t("manageGroup.notionlink.placeholder")}
              buttonValue={t("manageGroup.notionlink.button")}
              value={newNotionLink}
              onChange={(e) => setNewNotionLink(e.target.value)}
              onButtonClick={handleNotionLinkChange}
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
          <div
            className="w-full overflow-auto bg-white p-4 rounded-xl border border-gray-200"
            style={{ maxHeight: "300px" }}
          >
            <NotionWrapper recordMap={recordMap} />
          </div>
        ) : (
          <div className="text-center text-[#ff6e6e] text-base font-semibold font-['Pretendard']">
            노션 페이지를 불러오지 못했습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNotionLinkPage;
