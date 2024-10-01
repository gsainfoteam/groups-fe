const ManageNotionLinkPage = () => {
    return(
        <div className="flex flex-col items-center">
            <div className="flex w-[600px] pt-10 flex-col items-center gap-16">
                <div className="flex flex-row items-start gap-[10px]">
                    <p className="font-bold text-[20px]" style={{ fontFamily: 'Pretendard'}}>그룹 소개 노션 링크</p>
                </div>
                <p>그룹 소개 어쩌고 저쩌고 <span className="text-primary">여기는 색 변경</span> 이러쿵 저러쿵 얄리얄리얄라셩</p>
                <div className="flex flex-row items-start gap-[10px]">
                    <input className="flex px-2.5 py-2.5 flex-1 border border-primary rounded-xl" type="text" placeholder="기존 링크" />
                    <button className="flex px-2.5 py-2 rounded-xl bg-primary text-secondary" style={{ fontFamily: 'Pretendard' }}>변경</button>
                </div>
                <div className="flex w-[600px] h-[200px] rounded-xl justify-center items-center bg-greyLight">
                    <p>노션 불러오는 중</p>
                </div>
                <div className="flex flex-col items-center gap-5 self-stretch">
                    <button className="flex w-60 px-3.5 py-4 justify-center items-center gap-2.5 rounded-xl bg-primary text-secondary" style={{ fontFamily: 'Pretendard' }}>완료</button>
                </div>
            </div>
        </div>
    )
};

export default ManageNotionLinkPage;
