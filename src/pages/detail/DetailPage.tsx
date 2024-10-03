import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { getGroup } from "@/apis/group";

import GroupDetailTabs from "./GroupDetailTabs";

import GroupMembersTab from "./tabs/members/GroupMembersTab";
import GroupNoticesTab from "./tabs/notices/GroupNoticesTab";
import GroupIntroTab from "./tabs/intro/GroupIntroTab";
import GroupProfile from "./GroupProfile";
import Loading from "@/components/loading/Loading";
import Card from "@/components/card/Card";

interface GroupDetailPageProps {
  searchParams?: { tab: string; page: string };
}

const GroupDetailPage = ({ searchParams }: GroupDetailPageProps) => {
  const { uuid } = useParams<{ uuid: string }>();

  const { data: group } = useSWR(uuid, getGroup);

  const [tab, setTab] = useState("info");

  if (!group) {
    return <Loading />; // TODO: loading or error page
  }

  return (
    <main className={"flex flex-col items-center mt-[20px] md:mt-[48px]"}>
      <div className={"content flex max-w-[800px] flex-col"}>
        <GroupProfile group={group} />

        <Card className="my-[25px]">{group.description}</Card>

        <GroupDetailTabs activeTab={tab} setActiveTab={setTab} />
        {/* disabled intro notion tab since not working */}
        {/* {tab === "info" && <GroupIntroTab />} */}
        {tab === "notice" && <GroupNoticesTab searchParams={searchParams} />}
        {tab === "member" && <GroupMembersTab />}
      </div>
    </main>
  );
};

export default GroupDetailPage;
