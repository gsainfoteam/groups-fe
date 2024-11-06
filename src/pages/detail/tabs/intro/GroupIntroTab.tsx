// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";

import { getGroup } from "@/apis/group";
import { getNotionPage } from "@/apis/notion";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import NotionWrapper from "./NotionWrapper";
//import NotionWrapper from "./NotionWrapper";

interface GroupIntroTabProps {}

const GroupIntroTab = ({}: GroupIntroTabProps) => {
  const { uuid } = useParams();
  const { data: group, error: groupError } = useSWR(uuid, getGroup);
  const { data: recordMap, error: recordMapError } = useSWR(
    group && group.notionPageId,
    getNotionPage,
  );

  if (groupError) return <div>Group introduce page not found</div>;
  if (recordMapError)
    return <div>Notion page not found - Please Check your notion ID</div>;

  if (!group || !recordMap) return <div>Loading...</div>; // TODO: Add loading UI

  return (
    <div className={"mt-5"}>
      <NotionWrapper recordMap={recordMap} />
    </div>
  );
};

export default GroupIntroTab;
