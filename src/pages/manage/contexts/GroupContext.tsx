// ParentComponent.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getGroup } from "@/apis/group";
import { GroupInfo } from "@/types/interfaces";

const ParentComponent = ({ uuid }: { uuid: string }) => {
  const [group, setGroup] = useState<GroupInfo | null>(null);

  useEffect(() => {
    if (uuid) {
      getGroup(uuid)
        .then((data) => {
          console.log("group info:", data); // 성공 시 데이터 확인
          setGroup(data);
        })
        .catch((error) => console.error("Failed to fetch group info:", error));
    }
  }, [uuid]);

  return (
    <div>
      <h1>Parent Component</h1>
      <Outlet context={group} />
    </div>
  );
};

export default ParentComponent;
