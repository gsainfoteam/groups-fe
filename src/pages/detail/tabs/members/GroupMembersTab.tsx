import { getUserInfo } from "@/apis/auth";
import { getGroupMember } from "@/apis/group";
import { GroupInfo } from "@/types/interfaces";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import UserCircle from "@/assets/icons/user-circle.svg"

const GroupMembersTab = ({group}) => {
  const {uuid} = useParams<{uuid:string}>()
  const {data : members, error, isLoading } = useSWR(`/group/${uuid}/member`, getGroupMember)
  if(error || isLoading){
    return <p>Loading members...</p>
  }
  if (!members){
    return <p>Loading members...</p>
  }
  
  return <div className="flex flex-col items-center">
    {/* <UserCircle></UserCircle> */}
    <div className={"text-[20px] text-greyDark"}>{group.memberCount}명</div>

    {members.map(({name,email, role}:{name: string, email: string, role: string})=> 
    <div className={"flex items-center justify-between my-6 w-1/2 rounded-2xl bg-greyLight px-5 py-[15px] text-lg "}>
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
      <div className={"text-greyDark"}>
        {role}
      </div>
    </div>)}
  </div>
};

export default GroupMembersTab;
