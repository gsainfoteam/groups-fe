// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";

import { getGroup } from "@/apis/group";
import { getNotionPage } from "@/apis/notion";
import Card from "@/components/card/Card";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import NotionWrapper from "./NotionWrapper";
//import NotionWrapper from "./NotionWrapper";
const GroupIntroTab = () => {
  const { uuid } = useParams();
  const {
    data: group,
    error: groupError,
    isLoading,
  } = useSWR(["group", uuid || ""], ([_, uuid]) => getGroup(uuid));
  const { data: recordMap, error: recordMapError } = useSWR(
    ["notion", (group && group.notionPageId) || ""],
    ([_, notionPageId]) => getNotionPage(notionPageId),
  );
  const { t } = useTranslation();

  if (groupError) return <div>Group introduce page not found</div>;
  if (recordMapError)
    return <div>Notion page not found - Please Check your notion ID</div>;

  if (isLoading) return <Card className={"mt-5"}>Loading...</Card>; // TODO: Add loading UI

  if (!group || !recordMap)
    return <Card className={"mt-5"}>{t("group.intro.notExist")}</Card>;

  return (
    <div className={"mt-5"}>
      <NotionWrapper recordMap={recordMap} />
    </div>
  );
};

export default GroupIntroTab;
