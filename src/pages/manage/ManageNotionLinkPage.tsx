import Navigator from './components/Navigator';
import './index.css';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import Notion from '@/assets/icons/notion.svg?react';

const ManageNotionLinkPage = () => {
    return(
        <div className="flex flex-col items-center">
            <div className="flex w-[600px] pt-10 flex-col items-center gap-16">
                {/* 상단 바 */}
                <div className="flex flex-col items-start gap-5 self-stretch">
                    {/* 뒤로 가기 및 그룹 이름 */}
                    <div className="flex flex-col items-start gap-2.5 self-stretch">
                        <div className="flex items-center">
                            <ArrowRight className="h-6 w-6 stroke-primary scale-x-[-1]" />
                            <p className="text-primary text-xl font-medium">뒤로</p>
                        </div>
                        <p className="text-dark text-4xl font-bold">그룹 이름</p>
                    </div>
                    {/* 네비게이터 */}
                    <Navigator />
                </div>
                {/* 링크 수정 부 */}
                <div className='flex flex-col w-full gap-[30px]'>
                    {/* 텍스트 */}
                    <div className="w-full h-[156px] flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className="flex justify-start items-center gap-2.5 inline-flex">
                            <Notion className="w-10 h-10" />
                            <div className="text-dark text-[28px] font-bold">그룹 소개 노션 링크</div>
                        </div>
                        <div>
                            <span className="text-dark text-base font-normal font-['Pretendard']">그룹 소개에 여러분의 예쁜 노션 링크를 붙여넣을 수 있습니다.<br/></span>
                            <span className="text-primary text-base font-normal font-['Pretendard']">작성하신 그룹 소개 노션을 웹에 퍼블리싱</span>
                            <span className="text-dark text-base font-normal font-['Pretendard']">하신 다음, 그 링크를 여기에 붙여넣어 주세요.</span>
                        </div>
                        <div className="flex h-12 w-full items-center gap-2.5">
                            <input className="h-full px-4 py-2.5 flex-1 border border-primary rounded-xl" type="text" placeholder="현재 노션 링크" />
                            <button className="h-full px-5 py-2.5 rounded-xl bg-primary text-secondary">변경</button>
                        </div>
                    </div>
                    {/* 미리보기 */}
                    <div className="h-[159px] p-[25px] bg-[#f5f5f7] rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-[#6e6e73] text-base font-semibold font-['Pretendard']">노션 불러오는 중...</div>
                    </div>
                </div>
                {/* 버튼 부 */}
                <div className="flex flex-col items-center gap-5 self-stretch">
                    <button className="flex w-60 px-3.5 py-4 justify-center items-center gap-2.5 rounded-xl bg-primary text-secondary" style={{ fontFamily: 'Pretendard' }}>완료</button>
                </div>
            </div>
        </div>
    )
};

export default ManageNotionLinkPage;
