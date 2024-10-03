// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";

import useSWR from "swr";
import { getNotionPage } from "../../apis/notion";
import NotionWrapper from "./NotionWrapper";
import { useParams } from "react-router-dom";
import { getGroup } from "@/apis/group";

interface GroupIntroTabProps {}

const GroupIntroTab = ({}: GroupIntroTabProps) => {
  const { uuid } = useParams<{ uuid: string }>();
  const { data: group, error, isLoading } = useSWR(uuid, getGroup);
  const { data: recordMap } = useSWR(`${group!.notionPageId}`, getNotionPage);

  if (recordMap == null) {
    return <div>Notion page not found</div>;
  }

  return (
    <div className={"mt-5"}>
      <NotionWrapper recordMap={recordMap} />
    </div>
  );
};

export default GroupIntroTab;
