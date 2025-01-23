import { Suspense } from "react";

import CategorizedNotices from "@/components/categorizedNotices/CategorizedNotices";
import Loading from "@/components/loading/Loading";
import { useParams } from "react-router-dom";

interface GroupNoticesTabProps {
  searchParams?: { page: string };
}

const GroupNoticesTab = ({}: GroupNoticesTabProps) => {
  const {uuid} = useParams<{uuid: string}>()
  const params = new URLSearchParams();
  const page = parseInt(params.get("page") ?? "0");

  return (
    <Suspense key={JSON.stringify(page)} fallback={<Loading />}>
      <div className={"h-5"} />

      <CategorizedNotices uuid={uuid} />
    </Suspense>
  );
};

export default GroupNoticesTab;
