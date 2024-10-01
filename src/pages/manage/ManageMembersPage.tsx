import Member from './components/Member';
import MembersHeader from './components/MembersHeader';
import Navigator from './components/Navigator';
import './index.css';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';

const ManageMembersPage = () => {
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
                {/* 초대 */}
                <div className="flex flex-col w-[400px] justify-start items-center gap-2.5">
                    <p className="text-dark text-xl font-bold">그룹 멤버 초대 링크</p>
                    <div className="flex w-full pl-4 pr-2.5 py-2.5 bg-greyLight rounded-[10px] justify-start items-center gap-2.5">
                        <div className="grow text-greyDark text-base font-medium">1일 후 만료</div>
                        <ArrowRight className="stroke-dark w-6 h-6 rotate-90" />
                    </div>
                    <div className="w-full min-h px-[15px] py-2.5 bg-greyLight rounded-[10px] justify-center items-center">
                        <a href="https://inviteGroup.ziggle.gistory.me/3jlejkfheof90eh#wjkenbfkuweb" className="flex break-all justify-start itmes-center text-primary text-sm font-medium font-['Inconsolata'] leading-tight" target="_blank" rel="noopener noreferrer">
                            https://inviteGroup.ziggle.gistory.me/3jlejkfheof90eh#wjkenbfkuweb
                        </a>
                    </div>
                    <div className="text-greyDark text-base font-medium">링크를 클릭하면 복사됩니다.</div>
                </div>
                {/* 멤버 관리 */}
                <div className="flex flex-col w-full justify-start items-start gap-[15px]">
                    <div className="text-dark text-[28px] font-bold">멤버 관리</div>
                    {/* 멤버 목록 */}
                    <div className="w-full justify-start items-center flex flex-col">
                        <MembersHeader />
                        <Member name="고도현" email="doridori@gm.gist.ac.kr" role="관리자" />
                        <Member name="이보성" email="paperstar@gm.gist.ac.kr" role="매니저" />
                        <Member name="서강현" email="ganghyeonseo@gm.gist.ac.kr" role="일반" />
                        <Member name="최익준" email="ikjunchoi@gm.gist.ac.kr" role="일반" />
                    </div>
                    {/* 멤버 역할 */}
                    <div className="w-full self-stretch px-6 py-[22px] bg-greyLight rounded-[10px] flex-col justify-start items-start gap-3.5 flex">
                        <div className="self-stretch justify-start items-start flex text-dark text-xl font-bold">💡 멤버 역할</div>
                        <div className="self-stretch justify-start items-start flex flex-col gap-2.5">
                            <div className="self-stretch justify-start items-start inline-flex">
                                <p className="text-[#252525] text-base font-bold">관리자<span className="text-[#252525] text-base font-medium"> - 그룹 정보 수정, 멤버 역할 변경, 추방 등 모든 권한을 가집니다.</span></p>
                            </div>
                            <div className="self-stretch justify-start items-start inline-flex">
                                <p className="text-[#252525] text-base font-bold">매니저<span className="text-[#252525] text-base font-medium"> - 그룹 멤버 초대와 그룹 명의로 공지 작성이 가능합니다.</span></p>
                            </div>
                            <div className="self-stretch justify-start items-start inline-flex">
                                <p className="text-[#252525] text-base font-bold">일반<span className="text-[#252525] text-base font-medium"> - 그룹 나가기의 권한만 가집니다. 단, 그룹 소개 페이지에서 그룹의 일원으로 표시됩니다.</span></p>
                            </div>
                        </div>
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

export default ManageMembersPage;
