import Notion from "@/assets/icons/notion.svg?react";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../groupInfo/ManageGroupInfoPage";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import { getNotionPage } from "@/apis/notion";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

const ManageNotionLinkPage = () => {
  const { group, setGroup } = useOutletContext<GroupContextType>();
  const [isLoading, setIsLoading] = useState(true);
  const [notionData, setNotionData] = useState<null|ExtendedRecordMap>(null);

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  useEffect(() => {
    if (group.notionPageId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await getNotionPage(group.notionPageId);
          setNotionData(data);
          console.log(notionData?.block)
        } catch (error) {
          console.error("노션 데이터를 불러오는 중 오류가 발생했습니다:", error);
          setNotionData(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [group.notionPageId]);

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      {/* 링크 수정 부 */}
      <div className="flex flex-col w-full gap-[30px]">
        <div className="w-full flex-col justify-start items-start gap-[15px] flex">
          {/* 타이틀 */}
          <div className="flex justify-start items-center gap-2.5 inline-flex">
            <Notion className="w-[30px] h-[30px] md:w-10 md:h-10" />
            <div className="text-dark text-2xl md:text-[28px] font-bold">
              그룹 소개 노션 링크
            </div>
          </div>
          {/* 설명 */}
          <div className="flex flex-col">
            <span className="text-dark text-base">
              그룹 소개에 여러분의 예쁜 노션 링크를 붙여넣을 수 있습니다.
              <br />
            </span>
            <p className="text-dark text-base">
              <span className="text-primary text-base">
                작성하신 그룹 소개 노션을 웹에 퍼블리싱
              </span>
              하신 다음, 그 링크를 여기에 붙여넣어 주세요.
            </p>
          </div>
          {/* 링크 입력 및 제출 */}
          <div className="flex w-full items-center gap-2.5">
            <input
              className="h-full px-4 py-2.5 flex-1 border border-primary rounded-xl"
              type="text"
              placeholder={group.notionPageId}
            />
            <button className="h-full px-5 py-2.5 rounded-xl bg-primary text-secondary font-semibold">
              변경
            </button>
          </div>
        </div>
        {/* 미리보기 */}
        {isLoading ? (
          <div className="h-[300px] p-[25px] bg-[#f5f5f7] rounded-[10px] flex-col justify-center items-center gap-2.5 flex">
            <Loading topSpacing="h-0" className="w-14 h-14" withText={true} textClassName="text-lg mt-4"/>
          </div>
        ) : notionData ? (
          <div
            className="w-full overflow-auto bg-white p-4 rounded-xl border border-gray-200"
            style={{ maxHeight: '300px' }}
          >
            <NotionRenderer
              recordMap={notionData}
              fullPage={true}
              darkMode={false}
            />
          </div>
        ) : (
          <div className="text-center text-[#ff6e6e] text-base font-semibold font-['Pretendard']">
            노션 페이지를 불러오지 못했습니다.
          </div>
        )}
      </div>
      {/* 완료 버튼 */}
      <div className="flex justify-center self-stretch">
        <button className="w-full md:w-60 py-4 flex justify-center items-center rounded-xl bg-primary text-secondary text-lg font-bold">
          완료
        </button>
      </div>
    </div>
  );
};

export default ManageNotionLinkPage;