const MembersHeader = () => (
  <div className="flex h-[39px] justify-start items-center w-full">
    <div className="flex p-2.5 w-[62px] md:w-[62px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">이름</div>
    <div className="flex p-2.5 w-[232px] md:w-[232px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">이메일</div>
    <div className="flex p-2.5 w-[220px] md:w-[220px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">역할</div>
    <div className="flex p-2.5 w-[76px] md:w-[76px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">추방</div>
  </div>
  );
  
  export default MembersHeader;