const MembersHeader = () => (
  <div className="flex h-[39px] justify-start items-center w-full">
    <div className="flex p-2.5 w-[72px] md:w-[72px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">
      이름
    </div>
    <div className="flex p-2.5 w-[240px] md:w-[240px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">
      이메일
    </div>
    <div className="flex p-2.5 w-[200px] md:w-[200px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">
      역할
    </div>
    <div className="flex p-2.5 w-[86px] md:w-[86px] h-[39px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyDark">
      추방
    </div>
  </div>
);

export default MembersHeader;
