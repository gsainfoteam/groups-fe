import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

import { Notice } from "@/types/interfaces";
import ZaboActions from "./zaboActions/ZaboActions";
import ZaboTags from "./zaboTags/ZaboTags";
import ZaboHeader from "./zaboHeader/ZaboHeader";
import ZaboImages from "./zaboImages/ZaboImages";

export type ZaboOrigin = "width" | "height";

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends "width"
  ? { width: number; height?: never }
  : Origin extends "height"
    ? { height: number; width?: never }
    : never;

export type ZaboProps = Notice & {
  width?: number;
  height?: number; // migration ongoing | remove after migration complete
};

dayjs.extend(relativeTime);

const Zabo = (props: ZaboProps) => {
  const { createdAt, author, deadline, reactions, title, imageUrls, tags, id } =
    props;

  const hasImage = imageUrls.length > 0;

  return (
    <Link to={`/notice/${id}`}>
      <div
        className={
          "flex flex-col rounded-[10px] py-[10px] text-text transition hover:bg-greyLight dark:hover:bg-d_greyDark"
        }
      >
        <ZaboHeader author={author} deadline={deadline} createdAt={createdAt} />

        <p className={"mx-4 mb-[10px] text-xl font-semibold dark:text-d_white"}>
          {title}
        </p>

        {!hasImage && <ZaboTags notice={props} />}

        {hasImage && <ZaboImages title={title} imageUrls={imageUrls} />}

        {hasImage && (
          <div className="mx-2 my-4">
            <ZaboActions {...props} />
          </div>
        )}

        {hasImage && <ZaboTags notice={props} />}

        <div
          className={"mx-4 mt-[10px] line-clamp-3 text-lg dark:text-d_white"}
        >
          {props.content}
        </div>

        {!hasImage && (
          <div className="mx-2 mt-4">
            <ZaboActions {...props} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Zabo;
