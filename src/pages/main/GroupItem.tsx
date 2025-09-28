import { GroupInfoWithPresidentUuid } from "src/types/interfaces";

import { NavArrowRight, Settings, Crown } from 'iconoir-react';
import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";
import Card from "@/components/card/Card";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { getUserRole } from "@/apis/group";

const GroupItem = ({
  groupParams,
}: {
  groupParams: {
    group: GroupInfoWithPresidentUuid;
  };
}) => {
  const group = groupParams.group;

  const { data: userRole } = useSWR(
    ["userRole", group.uuid || ""],
    ([_, uuid]) => getUserRole(uuid),
  );

  if (!userRole) return <></>;

  const isAdmin = userRole.name === "admin";

  return (
    <Card>
      <a href={`/group/${group.uuid}`} className={"flex items-center"}>
        <img
          src={group.profileImageUrl || GroupProfileDefault}
          alt="group-default-profile"
          width={40}
          height={40}
        />

        <p className="ml-[15px] mr-[5px] text-lg font-semibold text-dark dark:text-d_white">
          {group.name}
        </p>

        {isAdmin && (
          <Crown color="rgb(235, 85, 40)" className="ml-1 inline stroke-dark dark:stroke-d_white" />
        )}

        <div className="flex-grow" />

        {isAdmin && (
          <Link to={`/manage/${group.uuid}/groupinfo`}>
            <Settings color="rgb(110, 110, 115)" className="fill-greyDark mr-2" />
          </Link>
        )}

        <NavArrowRight className="h-[30px] stroke-dark dark:stroke-d_white" />
      </a>
    </Card>
  );
};

export default GroupItem;
