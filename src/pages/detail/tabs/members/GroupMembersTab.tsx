import { getUserInfo } from "@/apis/auth";
import Card from "@/components/card/Card";
import useSWR from "swr";
import { getGroupMember } from "@/apis/group";
import { useParams } from "react-router-dom";
import { ExpandedGroupInfo } from "@/types/interfaces";
import UserCircle from "@/assets/icons/user-circle.svg?react";
interface GroupMemberProps {
  group: ExpandedGroupInfo;
}

const GroupMembersTab = ({ group }: GroupMemberProps) => {
  const { uuid } = useParams<{ uuid: string }>();
  const { data } = useSWR("UserInfo", getUserInfo);
  const {
    data: members,
    error,
    isLoading,
  } = useSWR(`/group/${uuid}/member`, getGroupMember);
  if (isLoading) {
    return <Card className={"mt-6"}>Loading members...</Card>;
  }
  if (error) {
    return <Card className={"mt-6"}>Failed to load members.</Card>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <UserCircle />
        <div className={"text-[20px] text-greyDark"}>{group.memberCount}명</div>
      </div>

      {members.map(
        (
          { name, email, role }: { name: string; email: string; role: string },
          idx: number,
        ) => (
          <Card
            key={email ?? idx}
            className={"flex items-center justify-between mt-6 w-2/3"}
          >
            <div>
              <p>{name}</p>
              <p>{email}</p>
            </div>
            <div>{role}</div>
          </Card>
        ),
      )}
    </div>
  );
};

export default GroupMembersTab;
