import { getUserInfo } from "@/apis/auth";
import { UserInfo } from "os";
import useSWR from "swr";

interface GroupMembersTabProps {}

const GroupMembersTab = ({}: GroupMembersTabProps) => {
  const {data, error, isLoading} = useSWR("UserInfo",getUserInfo)
  if(error || isLoading){
    return <p>Loading members...</p>
  }
  return <div className="flex flex-col items-center">
    <p className={"flex items-center justify-between my-6 w-2/3 rounded-2xl bg-greyLight px-5 py-[15px] text-lg text-greyDark"}>
      <div>
        <p>{data?.name}</p>
        <p>{data?.email}</p>
      </div>
      <div>
        Admin
      </div>
    </p>
  </div>;
};

export default GroupMembersTab;
