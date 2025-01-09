import MembersHeader from "./component/MembersHeader";
import Member from "./component/Member";
import InviteSection from "./component/InviteSection";
import { useOutletContext } from "react-router-dom";
import { GroupContextType } from "../groupInfo/ManageGroupInfoPage";
import { getGroupMembers, grantMemberRole } from "@/apis/group";
import { useEffect, useState } from "react";
import { MemberResDto } from "@/types/interfaces";
import Button from "@/components/button/Button";

const ManageMembersPage = () => {
  const { group } = useOutletContext<GroupContextType>();
  const [members, setMembers] = useState<MemberResDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [roleChanges, setRoleChanges] = useState<{ [key: string]: number }>({});

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

  const handleRoleChange = (memberId: string, newRoleId: number) => {
    setRoleChanges((prev) => ({
      ...prev,
      [memberId]: newRoleId,
    }));
  };

  // 전체 완료 버튼 핸들
  const handleComplete = async () => {
    try {
      setLoading(true);

      if (!group?.uuid) return;

      // 변경 사항 DB에 업데이트
      const updatePromises = Object.entries(roleChanges).map(
        ([memberUuid, roleId]) =>
          grantMemberRole(group.uuid, memberUuid, roleId),
      );

      await Promise.all(updatePromises);

      // 변경 사항 초기화
      setRoleChanges({});

      // 변경 사항 로컬에 반영
      const updatedMembers = await getGroupMembers(group.uuid);
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Error updating member roles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      {/* 초대 */}
      <InviteSection />
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
              onRoleChange={handleRoleChange}
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
        <Button
          size="cta"
          variant="emphasized"
          className="w-full md:w-60"
          onClick={handleComplete}
          disabled={loading || Object.keys(roleChanges).length === 0}
        >
          {loading ? "처리 중..." : "완료"}
        </Button>
      </div>
    </div>
  );
};

export default ManageMembersPage;
