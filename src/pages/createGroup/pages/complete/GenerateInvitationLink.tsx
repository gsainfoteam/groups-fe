import ArrowRight from "@/assets/icons/arrow-right.svg?react";

const GenerateInvitationLink = () => {
  return (
    <div className="flex flex-col md:w-[400px] justify-start items-center gap-2.5">
      <p className="text-dark text-xl font-bold">그룹 멤버 초대 링크</p>
      <div className="flex w-full pl-4 pr-2.5 py-2.5 bg-greyLight rounded-[10px] justify-start items-center gap-2.5">
        <div className="grow text-greyDark text-base font-medium">
          1일 후 만료
        </div>
        <ArrowRight className="stroke-dark w-6 h-6 rotate-90" />
      </div>
      <div className="w-full min-h px-[15px] py-2.5 bg-greyLight rounded-[10px] justify-center items-center">
        <a
          href="https://inviteGroup.ziggle.gistory.me/3jlejkfheof90eh#wjkenbfkuweb"
          className="flex break-all justify-start itmes-center text-primary text-sm font-medium font-['Inconsolata'] leading-tight"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://inviteGroup.ziggle.gistory.me/3jlejkfheof90eh#wjkenbfkuweb
        </a>
      </div>
      <div className="text-greyDark text-base font-medium">
        링크를 클릭하면 복사됩니다.
      </div>
    </div>
  );
};

export default GenerateInvitationLink;
