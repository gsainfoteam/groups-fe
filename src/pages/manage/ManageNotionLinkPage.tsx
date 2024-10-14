import Notion from '@/assets/icons/notion.svg?react';
import { useTranslation } from "react-i18next";

const ManageNotionLinkPage = () => {
    const { t } = useTranslation();

    return(
        <div className='flex w-full flex-col items-center gap-[30px] md:gap-16'>
            {/* 링크 수정 부 */}
            <div className='flex flex-col w-full gap-[30px]'>
                <div className="w-full flex-col justify-start items-start gap-[15px] flex">
                    {/* 타이틀 */}
                    <div className="flex justify-start items-center gap-2.5 inline-flex">
                        <Notion className="w-[30px] h-[30px] md:w-10 md:h-10" />
                        <div className="text-dark text-2xl md:text-[28px] font-bold">{t("manageGroup.notionlink.title")}</div>
                    </div>
                    {/* 설명 */}
                    <div className='flex flex-col'>
                        <span className="text-dark text-base">{t("manageGroup.notionlink.description.first")}<br/></span>
                        <p className="text-dark text-base">
                            <span className="text-primary text-base">
                            {t("manageGroup.notionlink.description.second")}</span>
                            {t("manageGroup.notionlink.description.third")}
                        </p>
                    </div>
                    {/* 링크 입력 및 제출 */}
                    <div className="flex w-full items-center gap-2.5">
                        <input className="h-full px-4 py-2.5 flex-1 border border-primary rounded-xl" type="url" placeholder="현재 노션 링크" aria-label='노션 링크 입력' />
                        <button className="h-full px-5 py-2.5 rounded-xl bg-primary text-secondary font-semibold">{t("manageGroup.notionlink.button")}</button>
                    </div>
                </div>
                {/* 미리보기 */}
                <div className="h-[159px] p-[25px] bg-greyLight rounded-[10px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="text-center text-greyDark text-base font-semibold">{t("manageGroup.notionlink.loading")}</div>
                </div>
            </div>
            {/* 완료 버튼 */}
            <div className="flex justify-center self-stretch">
                <button className="w-full md:w-60 py-4 flex justify-center items-center rounded-xl bg-primary text-secondary text-lg font-bold">{t("manageGroup.notionlink.complete")}</button>
            </div>
        </div>
    )
};

export default ManageNotionLinkPage;
