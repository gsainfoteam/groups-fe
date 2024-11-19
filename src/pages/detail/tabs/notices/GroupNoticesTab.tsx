import { Suspense } from "react";

import CategorizedNotices from "@/components/categorizedNotices/CategorizedNotices";
import Loading from "@/components/loading/Loading";
import { useParams } from "react-router-dom";
import { getNoticeGroup } from "@/apis/zigglepage";
interface GroupNoticesTabProps {
  searchParams?: { page: string };
}
const API_ZIGGLE = "https://api.stg.ziggle.gistory.me"
const GroupNoticesTab = ({}: GroupNoticesTabProps) => {
  const { uuid } = useParams<{ uuid: string }>();
  const params = new URLSearchParams();
  const page = parseInt(params.get("page") ?? "0");

  const data = getNoticeGroup(`${API_ZIGGLE}/notice/group/${uuid}`)
  console.log(data)
  return (
    <Suspense key={JSON.stringify(page)} fallback={<Loading />}>
      <div className={"h-5"} />

      <CategorizedNotices page={page} />
    </Suspense>
  );
};

export default GroupNoticesTab;
