import { GroupInfo } from "src/types/interfaces";

import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Crown from "@/assets/icons/crown.svg?react";
import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";

const GroupItem = ({
  groupParams,
}: {
  groupParams: {
    group: GroupInfo;
  };
}) => {
  const group = groupParams.group;

  return (
    <div className="w-full rounded-[15px] bg-greyLight p-5">
      <a href={`/group/${group.uuid}`} className={"flex items-center"}>
        <img
          src={GroupProfileDefault}
          alt="group-default-profile"
          width={40}
          height={40}
        />

        <p className="ml-[15px] mr-[5px] text-xl font-semibold text-text">
          {group.name}
        </p>

        {group.president && <Crown className="ml-1 inline stroke-text" />}

        <div className="flex-grow" />

        <ArrowRight className="h-[30px] stroke-text" />
      </a>
    </div>
  );
};

export default GroupItem;
