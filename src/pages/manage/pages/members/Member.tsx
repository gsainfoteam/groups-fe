import Select, { SelectOptionBase } from "@/components/select/Select";
import { MemberResDto } from "@/types/interfaces";
import { useEffect, useState } from "react";

const Member = ({ uuid, name, email, role }: MemberResDto) => {
  const roleOptions = [
    { id: 1, value: "관리자" },
    { id: 2, value: "매니저" },
    { id: 3, value: "일반" },
  ];

  const defaultRole = roleOptions.find((option) => option.value === role) || roleOptions[0];

  const [selectedRole, setSelectedRole] = useState(defaultRole);
  
  const handleOptionClick = (option: SelectOptionBase) => {
    setSelectedRole(option);
    console.log("선택한 역할:", option.value);
  };

  return (
    <div className="flex h-[50px] justify-start items-center">
      {/* 이름 */}
      <div className="flex p-2.5 w-[62px] md:w-[62px] h-[50px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyBorder">{name}</div>
      {/* 이메일 */}
      <div className="flex p-2.5 w-[232px] md:w-[232px] h-[50px] justify-start items-center text-greyDark text-base font-medium border-b-2 border-greyBorder">{email}</div>
      {/* 역할 */}
      <div className="flex justify-start p-2.5 w-[220px] md:w-[220px] h-[50px] border-b-2 border-greyBorder">
      <Select
          size="small"
          options={roleOptions}
          selectedValue={selectedRole}
          onOptionClick={handleOptionClick}
          className="flex w-full bg-greyLight rounded-[5px] justify-start items-center gap-2.5 text-dark"
        />
      </div>
      {/* 추방 버튼 */}
      <div className="flex underline p-2.5 w-[76px] md:w-[76px] h-[50px] justify-start items-center text-grey text-base font-medium border-b-2 border-greyBorder">추방하기</div>
    </div>
  );
};

export default Member;
