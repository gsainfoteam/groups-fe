import Select from "@/components/select/Select";
import { useState } from "react";

const LINK_EXPIRATION_OPTIONS = [
  {
    name: "1일 후 만료",
    expirationTime: 1,
  },
  {
    name: "3일 후 만료",
    expirationTime: 3,
  },
  {
    name: "일주일 후 만료",
    expirationTime: 7,
  },
];

const GenerateInvitationLink = () => {
  const [expirationOption, setExpirationOption] = useState(
    LINK_EXPIRATION_OPTIONS[0],
  );

  return (
    <div className="flex flex-col md:w-[400px] justify-start items-center gap-2.5">
      <p className="text-dark text-xl font-bold">그룹 멤버 초대 링크</p>

      <Select
        className="w-full"
        options={LINK_EXPIRATION_OPTIONS.map((option) => option.name)}
        selectedValue={expirationOption.name}
      />

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
