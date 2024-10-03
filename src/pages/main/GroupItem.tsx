import { GroupInfo } from "src/types/interfaces";

import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Crown from "@/assets/icons/crown.svg?react";
import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";
import Card from "@/components/card/Card";

const GroupItem = ({
  groupParams,
}: {
  groupParams: {
    group: GroupInfo;
  };
}) => {
  const group = groupParams.group;

  return (
    <Card>
      <a href={`/group/${group.uuid}`} className={"flex items-center"}>
        <img
          src={GroupProfileDefault}
          alt="group-default-profile"
          width={40}
          height={40}
        />

        <p className="ml-[15px] mr-[5px] text-lg font-semibold text-dark dark:text-d_white">
          {group.name}
        </p>

        {group.president && (
          <Crown className="ml-1 inline stroke-dark dark:stroke-d_white" />
        )}

        <div className="flex-grow" />

        <ArrowRight className="h-[30px] stroke-dark dark:stroke-d_white" />
      </a>
    </Card>
  );
};

export default GroupItem;
