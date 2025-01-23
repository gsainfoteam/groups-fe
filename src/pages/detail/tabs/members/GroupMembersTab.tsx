import { getUserInfo } from "@/apis/auth";
import Card from "@/components/card/Card";
import useSWR from "swr";
import { getGroupMember } from "@/apis/group";
import { useParams } from "react-router-dom";
import { GroupInfo } from "@/types/interfaces";

interface GroupMemberProps {
  group: GroupInfo;
}

const GroupMembersTab = ({group}:GroupMemberProps) => {

  const {uuid} = useParams<{uuid:string}>()
  const { data } = useSWR("UserInfo", getUserInfo);
  const {data : members, error, isLoading } = useSWR(`/group/${uuid}/member`, getGroupMember)
  if (isLoading) {
    return <Card className={"mt-6"}>Loading members...</Card>;
  }
  if (error) {
    return <Card className={"mt-6"}>Failed to load members.</Card>;
  }
  return <div className="flex flex-col items-center">
  {/* <UserCircle></UserCircle> */}
  <div className={"text-[20px] text-greyDark"}>{group.memberCount}명</div>

  {members.map(({name,email, role}:{name: string, email: string, role: string}, idx : string)=> 
  <div key={email ?? idx} className={"flex items-center justify-between my-6 w-1/2 rounded-2xl bg-greyLight px-5 py-[15px] text-lg "}>
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
    <div className={"text-greyDark"}>
      {role}
    </div>
  </div>
  )}
</div>
};

export default GroupMembersTab;
