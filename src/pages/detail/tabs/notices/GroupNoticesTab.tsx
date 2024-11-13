import { Suspense } from "react";

import CategorizedNotices from "@/components/categorizedNotices/CategorizedNotices";
import Loading from "@/components/loading/Loading";

interface GroupNoticesTabProps {
  searchParams?: { page: string };
}

const GroupNoticesTab = ({}: GroupNoticesTabProps) => {
  const params = new URLSearchParams();
  const page = parseInt(params.get("page") ?? "0");

  return (
    <Suspense key={JSON.stringify(page)} fallback={<Loading />}>
      <div className={"h-5"} />

      <CategorizedNotices page={page} />
    </Suspense>
  );
};

export default GroupNoticesTab;
