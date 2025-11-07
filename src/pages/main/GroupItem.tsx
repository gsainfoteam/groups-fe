import { GroupInfoWithPresidentUuid } from "src/types/interfaces";

import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Crown from "@/assets/icons/crown.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
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
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={group.profileImageUrl || GroupProfileDefault}
          alt="group-default-profile"
          className="w-full h-full object-cover" 
        />
      </div>

        <p className="ml-[15px] mr-[5px] text-lg font-semibold text-dark dark:text-d_white">
          {group.name}
        </p>

        {isAdmin && (
          <Crown className="ml-1 inline stroke-dark dark:stroke-d_white" />
        )}

        <div className="flex-grow" />

        {isAdmin && (
          <Link to={`/manage/${group.uuid}/groupinfo`}>
            <Settings className="fill-greyDark mr-2" />
          </Link>
        )}

        <ArrowRight className="h-[30px] stroke-dark dark:stroke-d_white" />
      </a>
    </Card>
  );
};

export default GroupItem;
