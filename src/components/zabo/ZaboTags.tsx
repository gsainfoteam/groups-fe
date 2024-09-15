import { Notice } from "@/types/interfaces";

import Tag from "../tag/Tag";

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags } }: ZaboTagsProps) => {
  return (
    <div className={"mx-3 flex flex-wrap gap-[5px]"}>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
};

export default ZaboTags;
