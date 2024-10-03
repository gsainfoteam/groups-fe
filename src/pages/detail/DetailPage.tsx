import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Button from "src/components/button/Button";
import useSWR from "swr";

import { getGroup } from "@/apis/group";
import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";

import GroupDetailTabs from "./GroupDetailTabs";

import GroupMembersTab from "./tabs/members/GroupMembersTab";
import GroupNoticesTab from "./tabs/notices/GroupNoticesTab";
import GroupIntroTab from "./tabs/intro/GroupIntroTab";
import GroupProfile from "./GroupProfile";
import Loading from "@/components/loading/Loading";

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
        <p
          className={
            "my-6 w-full rounded-2xl bg-greyLight px-5 py-[15px] text-lg text-greyDark"
          }
        >
          {group.description}
        </p>
        <GroupDetailTabs activeTab={tab} setActiveTab={setTab} />
        {/* disabled intro notion tab since not working */}
        {/* {tab === "info" && <GroupIntroTab />} */}{" "}
        {tab === "notice" && <GroupNoticesTab searchParams={searchParams} />}
        {tab === "member" && <GroupMembersTab />}
      </div>
    </main>
  );
};

export default GroupDetailPage;
