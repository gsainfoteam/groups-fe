import GroupProfileDefault from "@/assets/icons/group-profile-default.webp";
import Button from "@/components/button/Button";
import { GroupInfo } from "@/types/interfaces";
import { useTranslation } from "react-i18next";

interface GroupProfileProps {
  group: GroupInfo;
}

const GroupProfile = ({ group }: GroupProfileProps) => {
  const { t } = useTranslation();

  return (
    <div className={"flex items-center gap-[25px]"}>
      <img
        src={GroupProfileDefault}
        width={160}
        height={160}
        alt={"group default profile"}
      />

      <div className={"flex flex-col items-start"}>
        <p className={"text-[34px] font-bold leading-9"}>{group.name}</p>

        <p className={"mt-1 text-greyDark"}>
          {t("group.memberCount", {
            count: group.memberCount,
          })}
          {" · "}
          {t("group.noticeCount", {
            count: 0,
          })}
        </p>

        <Button
          variant="emphasized"
          className={"mt-3 rounded-[10px] md:px-6 md:py-2"}
        >
          <p>{t("group.favorite")}</p>
        </Button>
      </div>
    </div>
  );
};

export default GroupProfile;
