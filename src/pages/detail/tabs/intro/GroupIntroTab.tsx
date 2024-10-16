// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";

import useSWR from "swr";
import { getNotionPage } from "@/apis/notion";
import { useParams } from "react-router-dom";
import { getGroup } from "@/apis/group";
//import NotionWrapper from "./NotionWrapper";

interface GroupIntroTabProps {}

const GroupIntroTab = ({}: GroupIntroTabProps) => {
  const {uuid} = useParams();
  const {data : group } = useSWR(uuid,getGroup)
  const { data: recordMap } = useSWR(group.notionPageId,getNotionPage);        
  
  if (recordMap == null) {
    return <div>Notion page not found - Plese Check your notion ID</div>;
  }
 
  return (
    <div className={"mt-5"}>
      <div>Notion page found - Todo: fix notionwrapper error</div>
      {/* <NotionWrapper recordMap={recordMap} /> */}
    </div>
  );
};

export default GroupIntroTab;
