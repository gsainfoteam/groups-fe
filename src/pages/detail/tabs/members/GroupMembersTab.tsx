import Card from "@/components/card/Card";
import useSWR from "swr";
import { getGroupMembers } from "@/apis/group";
import { useOutletContext, useParams } from "react-router-dom";

import UserCircle from "@/assets/icons/user-circle.svg?react";

import { useTranslation } from "react-i18next";
import { GroupDetailContext } from "../../DetailPageLayout";

const GroupMembersTab = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const { group } = useOutletContext<GroupDetailContext>();

  const {
    data: members,
    error,
    isLoading,
  } = useSWR(["members", uuid || ""], ([_, uuid]) => getGroupMembers(uuid));

  const { t } = useTranslation();

  if (isLoading) {
    return <Card className={"mt-6"}>{t("group.members.loading")}</Card>;
  }
  if (error || !members) {
    return <Card className={"mt-6"}>{t("group.members.error")}</Card>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1.5 mt-6">
        <UserCircle />
        <div className={"text-[18px] text-greyDark"}>{group.memberCount}명</div>
      </div>

      {members.map(({ name, email, role }, idx) => (
        <Card
          key={email ?? idx}
          className={"flex items-center justify-between mt-6 w-2/3"}
        >
          <div>
            <p className="font-semibold text-dark">{name}</p>
            <p className="text-sm text-dark"> {email}</p>
          </div>
          <div className="text-sm text-greyDark font-medium">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GroupMembersTab;
