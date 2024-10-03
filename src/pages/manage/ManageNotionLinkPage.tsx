import Navigator from './components/Navigator';
import './index.css';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import Notion from '@/assets/icons/notion.svg?react';

const ManageNotionLinkPage = () => {
    return(
        <div className='flex w-full flex-col items-center gap-[30px] md:gap-16'>
            {/* 링크 수정 부 */}
            <div className='flex flex-col w-full gap-[30px]'>
                <div className="w-full flex-col justify-start items-start gap-[15px] flex">
                    {/* 타이틀 */}
                    <div className="flex justify-start items-center gap-2.5 inline-flex">
                        <Notion className="w-[30px] h-[30px] md:w-10 md:h-10" />
                        <div className="text-dark text-2xl md:text-[28px] font-bold">그룹 소개 노션 링크</div>
                    </div>
                    {/* 설명 */}
                    <div className='flex flex-col'>
                        <span className="text-dark text-base">그룹 소개에 여러분의 예쁜 노션 링크를 붙여넣을 수 있습니다.<br/></span>
                        <p className="text-dark text-base">
                            <span className="text-primary text-base">
                                작성하신 그룹 소개 노션을 웹에 퍼블리싱</span>
                            하신 다음, 그 링크를 여기에 붙여넣어 주세요.
                        </p>
                    </div>
                    {/* 링크 입력 및 제출 */}
                    <div className="flex w-full items-center gap-2.5">
                        <input className="h-full px-4 py-2.5 flex-1 border border-primary rounded-xl" type="text" placeholder="현재 노션 링크" />
                        <button className="h-full px-5 py-2.5 rounded-xl bg-primary text-secondary font-semibold">변경</button>
                    </div>
                </div>
                {/* 미리보기 */}
                <div className="h-[159px] p-[25px] bg-greyLight rounded-[10px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="text-center text-greyDark text-base font-semibold">노션 불러오는 중...</div>
                </div>
            </div>
            {/* 완료 버튼 */}
            <div className="flex justify-center self-stretch">
                <button className="w-full md:w-60 py-4 flex justify-center items-center rounded-xl bg-primary text-secondary text-lg font-bold">완료</button>
            </div>
        </div>
    )
};

export default ManageNotionLinkPage;
