import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Button from "src/components/button/Button";
import useSWR from "swr";

import { getGroup } from "@/apis/group";
import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";

import GroupDetailTabs from "./GroupDetailTabs";
import GroupIntroTab from "./GroupIntroTab";
import GroupMembersTab from "./GroupMembersTab";
import GroupNoticesTab from "./GroupNoticesTab";

interface GroupDetailPageProps {
  searchParams?: { tab: string; page: string };
}

const GroupDetailPage = ({ searchParams }: GroupDetailPageProps) => {
  const { uuid } = useParams<{ uuid: string }>();

  const { data: group, error, isLoading } = useSWR(uuid, getGroup);
  const { t } = useTranslation();

  const [tab, setTab] = useState("info");

  if (error) {
    console.log(error)
    return <div>failed to load</div>;
  }
  else if(isLoading){
    return <div>loading...</div>
  }
  else{
  return (
    <main className={"flex flex-col items-center"}>
      <div className={"content flex max-w-[800px] flex-col"}>
        <div className={"flex items-center gap-[25px]"}>
          <img
            src={GroupProfileDefault}
            width={160}
            height={160}
            alt={"group default profile"}
          />

          <div className={"flex flex-col items-start"}>
            <p className={"text-[34px] font-bold leading-9"}>{group?.name}</p>

            <p className={"mt-1 text-greyDark"}>
              {t("group.memberCount", {
                count: group?.memberCount ?? 0,
              })}
              {" · "}
              {t("group.noticeCount", {
                count: 0,
              })}
            </p>

            <Button
              variant="contained"
              className={"mt-3 rounded-[10px] md:px-6 md:py-2"}
            >
              <p>{t("group.favorite")}</p>
            </Button>
          </div>
        </div>

        <p
          className={
            "my-6 w-full rounded-2xl bg-greyLight px-5 py-[15px] text-lg text-greyDark"
          }
        >
          {group?.description}
        </p>

        <GroupDetailTabs activeTab={tab} setActiveTab={setTab} />

        {tab === "info" && <GroupIntroTab />}
        {tab === "notice" && <GroupNoticesTab searchParams={searchParams} />}
        {tab === "member" && <GroupMembersTab />}
      </div>
    </main>
  );
}
};

export default GroupDetailPage;
