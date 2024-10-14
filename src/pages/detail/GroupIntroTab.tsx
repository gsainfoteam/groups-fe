
import useSWR from "swr";
import { getNotionPage } from "../../apis/notion";
import NotionWrapper from "./NotionWrapper";
import { useParams } from "react-router-dom";
import { getGroup } from "@/apis/group";

interface GroupIntroTabProps {}

const GroupIntroTab = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { data: group, error, isLoading } = useSWR(uuid, getGroup);
  const { data: recordMap } = useSWR(()=> (group?`${group.notionPageId}`:null), 
  getNotionPage
);

  if (!recordMap) {
    return <div>Notion page not found</div>;
  }
  return (
    <div className={"mt-5"}>
      <NotionWrapper recordMap={recordMap}/>
    </div>
  );
};

export default GroupIntroTab;
