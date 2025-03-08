import { GroupInfoWithPresidentUuid } from "src/types/interfaces";

import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Crown from "@/assets/icons/crown.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";
import Card from "@/components/card/Card";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const GroupItem = ({
  groupParams,
}: {
  groupParams: {
    group: GroupInfoWithPresidentUuid;
  };
}) => {
  const group = groupParams.group;
  const { userInfo } = useAuth();
  
  const isPresident = userInfo?.uuid === group.presidentUuid;

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

        {isPresident && (
          <Crown className="ml-1 inline stroke-dark dark:stroke-d_white" />
        )}

        <div className="flex-grow" />

        {isPresident && (
          <Link to={`/manage/${group.uuid}`}>
            <Settings className="fill-greyDark mr-2" />
          </Link>
        )}

        <ArrowRight className="h-[30px] stroke-dark dark:stroke-d_white" />
      </a>
    </Card>
  );
};

export default GroupItem;
