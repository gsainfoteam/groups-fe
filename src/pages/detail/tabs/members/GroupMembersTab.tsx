import { getUserInfo } from "@/apis/auth";
import { getGroupMember } from "@/apis/group";
import { useParams } from "react-router-dom";
import useSWR from "swr";


const GroupMembersTab = () => {
  const {uuid} = useParams<{uuid:string}>()
  const {data : members, error, isLoading } = useSWR(`/group/${uuid}/member`, getGroupMember)
  console.log(members)
  if(error || isLoading){
    return <p>Loading members...</p>
  }
  
  return <div className="flex flex-col items-center">
    {members.map(({name,uuid}:{name: string, uuid: string})=> 
    <div className={"flex items-center justify-between my-6 w-2/3 rounded-2xl bg-greyLight px-5 py-[15px] text-lg text-greyDark"}>
      <div>
        <p>{name}</p>
        <p>{uuid}</p> 
        {/* uuid must be changed as email */}
      </div>
      <div>
        Admin
        {/* This part must be changed as role */}
      </div>
    </div>)}
  </div>
};

export default GroupMembersTab;
