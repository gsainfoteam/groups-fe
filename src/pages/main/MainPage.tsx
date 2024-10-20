import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Trans, useTranslation } from "react-i18next";
import useSWR from "swr";

import { getGroupContainingMe } from "@/apis/group";
import Button from "@/components/button/Button";

import GroupItem from "./GroupItem";
import NotInGroup from "./NotInGroup";
import Card from "@/components/card/Card";
import Path from "@/types/paths";

const MainPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const joinedGroupName = location.state?.joinedGroupName;

  const { data: groupList } = useSWR("groupContainingMe", getGroupContainingMe);

  if (!groupList) {
    return <div></div>; // TODO: loading or error page
  }

  return (
    <main className="flex flex-col items-center py-10">
      <div className="content flex max-w-[600px] flex-col items-center gap-[10px]">
        <div className="title mb-10 w-full text-4xl font-bold text-text">
          {t("group.mainTitle")}
        </div>
        {joinedGroupName && (
          <Card className="bg-secondary">
            <Trans t={t} i18nKey={"group.successfullyJoinedMessage"}>
              {{ groupName: joinedGroupName }}
            </Trans>
          </Card>
        )}

        {groupList.length === 0 ? (
          <NotInGroup />
        ) : (
          groupList.map((group) => {
            return <GroupItem key={group.name} groupParams={{ group }} />;
          })
        )}

        <Card className="text-base my-[40px]">
          {t("group.mainDescription")}
        </Card>

        <Link to={Path.CreateName}>
          <Button
            variant="emphasized"
            className="mb-4 w-60 rounded-[10px] py-2"
          >
            <p className="mx-3 my-1 text-base font-bold">
              {t("group.createGroup")}
            </p>
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default MainPage;
