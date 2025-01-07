import MembersHeader from "./MembersHeader";
import Member from "./Member";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../groupInfo/ManageGroupInfoPage";
import { getGroupMembers, generateInviteCode } from "@/apis/group";
import { useEffect, useState } from "react";
import { MemberResDto } from "@/types/interfaces";
import Button from "@/components/button/Button";
import Select, { SelectOptionBase } from "@/components/select/Select";

const ManageMembersPage = () => {
  const { group } = useOutletContext<GroupContextType>();
  const [members, setMembers] = useState<MemberResDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const expirationOptions = [
    { id: 1, value: "1일 후 만료" },
    { id: 7, value: "7일 후 만료" },
    { id: 30, value: "30일 후 만료" },
  ];

  const [selectedOption, setSelectedOption] = useState(expirationOptions[0]);

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response: MemberResDto[] = await getGroupMembers(group.uuid);
        setMembers(response);
      } catch (error) {
        console.error("멤버 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (group?.uuid) {
      fetchMembers();
    }
  }, [group?.uuid]);

  useEffect(() => {
    const generateLink = async () => {
      if (!group?.uuid || !selectedOption) return;

      setLoading(true);
      try {
        const data = await generateInviteCode(
          group.uuid,
          selectedOption.id * 86400,
        );
        setInviteLink(data.code);
      } catch (error) {
        console.error("링크 생성 실패:", error);
        alert("링크 생성에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    generateLink();
  }, [selectedOption, group?.uuid]);

  const handleOptionClick = (option: SelectOptionBase) => {
    setSelectedOption(option);
  };

  const handleCopyLink = () => {
    if (!inviteLink) {
      alert("생성된 링크가 없습니다.");
      return;
    }

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => alert("링크가 복사되었습니다!"))
      .catch((err) => console.error("복사 실패:", err));
  };

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      {/* 초대 */}
      <div className="flex flex-col md:w-[400px] justify-start items-center gap-2.5">
        <p className="text-dark text-xl font-bold">그룹 멤버 초대 링크</p>
        <Select
          size="big"
          options={expirationOptions}
          selectedValue={selectedOption}
          onOptionClick={handleOptionClick}
          className="flex w-full bg-greyLight rounded-[10px] justify-start items-center gap-2.5 text-dark"
        />
        <div
          className="w-full min-h px-[15px] py-2.5 bg-greyLight rounded-[10px] justify-center items-center"
          onClick={handleCopyLink}
        >
          <p className="flex break-all justify-start itmes-center text-primary text-sm font-medium font-['Inconsolata'] leading-tight">
            {loading
              ? "링크 생성 중..."
              : inviteLink || "만료 기한을 선택해 주세요"}
          </p>
        </div>
        <div className="text-greyDark text-base font-medium">
          링크를 클릭하면 복사됩니다.
        </div>
      </div>
      {/* 멤버 관리 */}
      <div className="flex flex-col w-full justify-start items-start gap-[15px]">
        <div className="text-dark text-[28px] font-bold">멤버 관리</div>
        {/* 멤버 목록 */}
        <div className="w-full justify-start items-center flex-col overflow-x-scroll">
          <MembersHeader />
          {members.map((member) => (
            <Member
              key={member.uuid}
              uuid={member.uuid}
              name={member.name}
              email={member.email}
              role={
                member.role === "admin"
                  ? "관리자"
                  : member.role === "manager"
                    ? "매니저"
                    : "일반"
              }
            />
          ))}
        </div>
        {/* 멤버 역할 */}
        <div className="w-full self-stretch px-6 py-[22px] bg-greyLight rounded-[10px] flex-col justify-start items-start gap-3.5 flex">
          <div className="self-stretch justify-start items-start flex text-dark text-xl font-bold">
            💡 멤버 역할
          </div>
          <div className="self-stretch justify-start items-start flex flex-col gap-2.5">
            <div className="self-stretch justify-start items-start inline-flex">
              <p className="text-[#252525] text-base font-bold">
                관리자
                <span className="text-[#252525] text-base font-medium">
                  {" "}
                  - 그룹 정보 수정, 멤버 역할 변경, 추방 등 모든 권한을
                  가집니다.
                </span>
              </p>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <p className="text-[#252525] text-base font-bold">
                매니저
                <span className="text-[#252525] text-base font-medium">
                  {" "}
                  - 그룹 멤버 초대와 그룹 명의로 공지 작성이 가능합니다.
                </span>
              </p>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <p className="text-[#252525] text-base font-bold">
                일반
                <span className="text-[#252525] text-base font-medium">
                  {" "}
                  - 그룹 나가기의 권한만 가집니다. 단, 그룹 소개 페이지에서
                  그룹의 일원으로 표시됩니다.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 완료 버튼 */}
      <div className="flex justify-center self-stretch">
        <Button size="cta" variant="emphasized" className="w-full md:w-60">
          완료
        </Button>
      </div>
    </div>
  );
};

export default ManageMembersPage;
