import './index.css';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';

const ManageGroupInfoPage = () => {
    return (
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
                        <p className="text-4xl font-bold leading-normal">그룹 이름</p>
                    </div>
                    {/* 네비게이터 */}
                    <div className="flex items-start h-[50px] w-full border-b-[3px] border-grey">
                        <div className="box-border h-[50px] flex p-2.5 justify-center items-center text-grey font-medium">기본 정보</div>
                        <div className="box-border h-[50px] flex p-2.5 justify-center items-center text-primary font-medium border-b-[3px] border-primary">소개 페이지</div>
                        <div className="box-border h-[50px] flex p-2.5 justify-center items-center text-grey font-medium">멤버</div>
                    </div>
                </div>
                {/* 프로필 사진 변경 */}
                <div className="flex flex-col items-center gap-[27px] self-stretch">
                    <div className="flex w-[200px] h-[200px] justify-center items-center rounded-[100px] border border-light-primary">
                        이미지 보여주기
                    </div>
                    <button className="w-60 px-2.5 py-4 flex justify-center items-center rounded-xl border border-primary bg-white">
                        <span className="flex-1 text-primary text-center text-lg font-bold">
                            그룹 프로필 사진 변경
                        </span>
                    </button>
                </div>
                {/* 그룹명 변경 */}
                <div className="flex w-full flex-col items-start gap-4">
                    <p className="text-2xl font-bold text-dark">그룹명</p>
                    <p className="text-base font-medium text-dark">그룹명 변경</p>
                    {/* 그룹명 입력부 */}
                    <div className="flex h-12 w-full items-center gap-2.5">
                        <input className="h-full px-4 py-2.5 flex-1 border border-primary rounded-xl" type="text" placeholder="현재 그룹명" />
                        <button className="h-full px-5 py-2.5 rounded-xl bg-primary text-secondary">변경</button>
                    </div>
                </div>
                {/* 그룹 소개 변경 */}
                <div className="flex w-full flex-col justify-center items-start gap-4">
                    <p className="text-2xl font-bold text-dark">그룹 간단 소개</p>
                    <p className="text-base font-medium text-dark">그룹 간단 소개 변경</p>
                    {/* 그룹 소개 입력부 */}
                    <div  className="w-full flex flex-col items-end gap-2.5">
                        <div className='flex flex-col w-full gap-1.5'>
                            <textarea className="h-[100px] w-full px-4 py-2.5 rounded-xl border border-primary" placeholder="현재 그룹 간단 소개"></textarea>
                            <p className='flex w-full justify-end text-greyDark text-xs'>200/500</p>
                        </div>
                        <button className="px-6 py-2.5 rounded-xl text-secondary bg-primary">변경</button>
                    </div>
                </div>
                {/* 삭제 및 나가기*/}
                <div className="w-full p-5 flex flex-col justify-center items-start gap-5 rounded-xl border-2 border-greyBorder">
                    {/* 삭제 */}
                    <div className="flex items-center gap-5 self-stretch">
                        <div className="flex flex-col items-start gap-2.5 flex-1">
                            <p className="self-stretch text-primary font-bold text-xl">그룹 삭제</p>
                            <p className="self-stretch text-greyDark font-medium text-base">기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 본 작업은 되돌릴 수 없습니다.</p>
                        </div>
                        <button className="px-4 py-2 flex justify-center items-center text-primary border border-primary rounded-md">삭제하기</button>
                    </div>
                    {/* 중앙선 */}
                    <div className='w-full h-[1.5px] bg-greyBorder'></div>
                    {/* 나가기 */}
                    <div className="flex items-center gap-5 self-stretch">
                        <div className="flex flex-col items-start gap-2.5 flex-1">
                            <p className="self-stretch text-primary font-bold text-xl">그룹 나가기</p>
                            <p className="self-stretch text-greyDark font-medium text-base">기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 그룹을 나간 뒤에도 초대된다면 다시 그룹에 참여할 수 있습니다.</p>
                        </div>
                        <button className="px-4 py-2 flex justify-center items-center text-primary border border-primary rounded-md">나가기</button>
                    </div>
                </div>
                {/* 완료 버튼 */}
                <div className="flex justify-center self-stretch">
                <button className="w-60 py-4 flex justify-center items-center rounded-xl bg-primary text-secondary text-lg font-bold">완료</button>
                </div>
            </div>
        </div>
    );
};

export default ManageGroupInfoPage;
