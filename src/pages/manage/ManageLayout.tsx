import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { getGroup, getUserRole } from "@/apis/group";
import {
  ExpandedGroupInfo,
  GroupInfo,
  RoleAuthorities,
  RoleNames,
} from "@/types/interfaces";
import Navigator from "./Navigator";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import Loading from "@/components/loading/Loading";

export interface UserRole {
  roleName: (typeof RoleNames)[keyof typeof RoleNames];
  authorities: (typeof RoleAuthorities)[keyof typeof RoleAuthorities][];
}

export type GroupContextType = {
  group: ExpandedGroupInfo;
  userRole: UserRole;
};

const ManageLayout = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: group, error: groupError } = useSWR<ExpandedGroupInfo>(
    uuid ? `group-${uuid}` : null,
    () => getGroup(uuid as string),
  );

  const { data: roleData, error: roleError } = useSWR(
    uuid ? `role-${uuid}` : null,
    () => getUserRole(uuid as string),
  );

  const userRole = {
    roleName: roleData?.name ?? "member",
    authorities: roleData?.authorities ?? [],
  };
  const isLoading = !group || !roleData;

  const handleGoBack = () => {
    navigate(`/group/${uuid}`);
  };

  if (!uuid) return <p>유효하지 않은 그룹입니다.</p>;

<<<<<<< Updated upstream
  if (isLoading) return <p>데이터를 불러오는 중...</p>;
=======
  if (isLoading) return <Loading />;
>>>>>>> Stashed changes

  if (groupError || roleError)
    return <p>데이터를 불러오는 데 문제가 발생했습니다.</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full px-[18px] md:w-[600px] md:px-0 pt-10 pb-10 flex-col items-center gap-[30px] md:gap-16">
        {/* 상단 바 */}
        <div className="flex flex-col items-start gap-5 self-stretch">
          {/* 뒤로 가기 및 그룹 이름 */}
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <div onClick={handleGoBack} className="cursor-pointer">
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6 stroke-primary scale-x-[-1]" />
                <p className="text-primary text-base md:text-xl font-medium">
                  {t("manageGroup.goBack")}
                </p>
              </div>
            </div>
            <GroupHeader group={group} />
          </div>
          {/* 네비게이터 */}
          <Navigator />
        </div>
        {/* 개별 페이지의 콘텐츠 */}
        <Outlet context={{ group, userRole }} />
      </div>
    </div>
  );
};

const GroupHeader = ({ group }: { group: GroupInfo | null }) => {
  if (!group) {
<<<<<<< Updated upstream
    return <p className="text-gray-500">데이터를 불러오는 중...</p>;
=======
    return <Loading />;
>>>>>>> Stashed changes
  }

  return (
    <div>
      <p className="text-dark dark:text-grey text-[26px] md:text-4xl font-bold">
        {group.name}
      </p>
    </div>
  );
};

export default ManageLayout;
