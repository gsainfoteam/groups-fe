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
import { useOutletContext, useParams } from "react-router-dom";
import useSWR from "swr";
import NotionWrapper from "./NotionWrapper";
import Loading from "@/components/loading/Loading";
import { GroupDetailContext } from "../../DetailPageLayout";

const GroupIntroTab = () => {
  const { group } = useOutletContext<GroupDetailContext>();

  const {
    data: recordMap,
    isLoading: isRecordMapLoading,
    error: recordMapError,
  } = useSWR(
    ["notion", (group && group.notionPageId) || ""],
    ([_, notionPageId]) => getNotionPage(notionPageId),
  );
  const { t } = useTranslation();

  if (!group || !recordMap || recordMapError)
    return <Card className={"mt-5"}>{t("group.intro.notExist")}</Card>;

  return (
    <div className={"mt-5"}>
      {isRecordMapLoading && <Loading />}

      <NotionWrapper recordMap={recordMap} />
    </div>
  );
};

export default GroupIntroTab;
