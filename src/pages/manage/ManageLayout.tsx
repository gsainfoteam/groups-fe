import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Path from "@/types/paths";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGroup } from "@/apis/group";
import { GroupInfo } from "@/types/interfaces";
import Navigator from "./Navigator";

const ManageLayout = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const [group, setGroup] = useState<GroupInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uuid) {
      getGroup(uuid)
        .then((data) => {
          console.log("group info:", data);
          setGroup(data);
        })
        .catch((error) => console.error("Failed to fetch group info:", error))
        .finally(() => setLoading(false));
    }
  }, [uuid]);

  if (!uuid) return <p>유효하지 않은 그룹입니다.</p>;

  if (loading) return <p>데이터를 불러오는 중...</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full px-[18px] md:w-[600px] md:px-0 pt-10 pb-10 flex-col items-center gap-[30px] md:gap-16">
        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <Link to={Path.Home}>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6 stroke-primary scale-x-[-1]" />
                <p className="text-primary text-base md:text-xl font-medium">
                  뒤로
                </p>
              </div>
            </Link>
            <GroupHeader group={group} />
          </div>

          <Navigator />
        </div>

        <Outlet context={{ group, setGroup }} />
      </div>
    </div>
  );
};

const GroupHeader = ({ group }: { group: GroupInfo | null }) => {
  if (!group) {
    return <p className="text-gray-500">데이터를 불러오는 중...</p>;
  }

  return (
    <div>
      <p className="text-dark text-[26px] md:text-4xl font-bold">
        {group.name}
      </p>
    </div>
  );
};

export default ManageLayout;
