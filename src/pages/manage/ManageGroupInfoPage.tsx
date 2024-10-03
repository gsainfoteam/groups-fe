import Navigator from './components/Navigator';
import './index.css';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';

const ManageGroupInfoPage = () => {
    return (
        <div className='flex w-full flex-col items-center gap-[30px] md:gap-16'>
            {/* 프로필 사진 변경 */}
            <div className="flex flex-col items-center gap-[27px] self-stretch">
                <div className="flex w-[140px] h-[140px] md:w-[200px] md:h-[200px] justify-center items-center rounded-[100px] border border-light-primary">
                    이미지 보여주기
                </div>
                <button className="px-[25px] py-2.5 md:w-60 md:py-[15px] flex justify-center items-center rounded-xl border border-primary bg-white">
                    <span className="flex-1 text-primary text-center text-base md:text-lg font-bold">
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
                    <button className="h-full px-5 py-2.5 rounded-xl bg-primary text-secondary font-semibold">변경</button>
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
                    <button className="px-6 py-2.5 rounded-xl text-secondary bg-primary font-semibold">변경</button>
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
                    <button className="h-[31px] px-[15px] py-[7px] md:px-4 md:py-2 flex justify-center items-center text-primary border border-primary rounded-md">삭제하기</button>
                </div>
                {/* 중앙선 */}
                <div className='w-full h-[1.5px] bg-greyBorder'></div>
                {/* 나가기 */}
                <div className="flex items-center gap-5 self-stretch">
                    <div className="flex flex-col items-start gap-2.5 flex-1">
                        <p className="self-stretch text-primary font-bold text-xl">그룹 나가기</p>
                        <p className="self-stretch text-greyDark font-medium text-base">기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 그룹을 나간 뒤에도 초대된다면 다시 그룹에 참여할 수 있습니다.</p>
                    </div>
                    <button className="h-[31px] px-[15px] py-[7px] md:px-4 md:py-2 flex justify-center items-center text-primary border border-primary rounded-md">나가기</button>
                </div>
            </div>
            {/* 완료 버튼 */}
            <div className="flex justify-center self-stretch">
                <button className="w-full md:w-60 py-4 flex justify-center items-center rounded-xl bg-primary text-secondary text-lg font-bold">완료</button>
            </div>
        </div>
    );
};

export default ManageGroupInfoPage;
