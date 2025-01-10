import DefaultProfile from "@/assets/icons/default-profile.svg?react";
import { ZaboProps } from "../Zabo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DDay from "@/components/DDay/DDay";

interface ZaboHeaderProps
  extends Pick<ZaboProps, "author" | "createdAt" | "deadline"> {}

dayjs.extend(relativeTime);

const ZaboHeader = ({ author, createdAt, deadline }: ZaboHeaderProps) => {
  const timeAgo = dayjs(createdAt).fromNow();

  return (
    <div className={"mx-3 my-[10px] flex flex-wrap items-center gap-y-3"}>
      <DefaultProfile width={36} height={36} />

      <p className={"ml-2 text-lg font-medium dark:text-d_white"}>
        {author.name}
      </p>

      <p className={"mx-[5px] font-bold text-greyDark dark:text-grey"}>·</p>

      <p className={"font-medium text-greyDark dark:text-grey"}>{timeAgo}</p>

      {deadline !== null && (
        <>
          <div className="w-[15px]" />
          <DDay deadline={dayjs(deadline)} />
        </>
      )}
    </div>
  );
};

export default ZaboHeader;
