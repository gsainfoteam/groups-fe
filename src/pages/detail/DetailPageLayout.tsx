import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import useSWR from "swr";

import { getGroup } from "@/apis/group";

import GroupDetailTabs from "./GroupDetailTabs";

import Card from "@/components/card/Card";
import Loading from "@/components/loading/Loading";
import GroupProfile from "./GroupProfile";
import GroupIntroTab from "./tabs/intro/GroupIntroTab";
import GroupMembersTab from "./tabs/members/GroupMembersTab";
import GroupNoticesTab from "./tabs/notices/GroupNoticesTab";
import { ExpandedGroupInfo } from "@/types/interfaces";

interface GroupDetailPageProps {
  searchParams?: { tab: string; page: string };
}

export interface GroupDetailContext {
  group: ExpandedGroupInfo;
}

const GroupDetailPage = ({ searchParams }: GroupDetailPageProps) => {
  const { uuid } = useParams<{ uuid: string }>();

  const { data: group } = useSWR(["group", uuid || ""], ([_, uuid]) =>
    getGroup(uuid),
  );

  if (!group) {
    return <Loading />; // TODO: loading or error page
  }

  return (
    <main className={"flex flex-col items-center mt-[20px] md:mt-[48px]"}>
      <div className={"content flex max-w-[800px] flex-col mb-[100px]"}>
        <GroupProfile group={group} />

        <Card className="my-[25px]">{group.description}</Card>

        <GroupDetailTabs />

        <Outlet context={{ group }} />
      </div>
    </main>
  );
};

export default GroupDetailPage;
