import { Link, useNavigate, useSearchParams } from "react-router-dom";
import JoinGroupAnimation from "@/assets/animations/JoinGroup.json";
import Lottie from "lottie-react";
import useSWR from "swr";
import apiKeys from "@/types/api-keys";
import { getGroup } from "@/apis/group";
import { Trans, useTranslation } from "react-i18next";
import Button from "@/components/button/Button";
import Path from "@/types/paths";
import Loading from "@/components/loading/Loading";

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const groupUuid = searchParams.get("groupUuid");
  const code = searchParams.get("code");
  const navigator = useNavigate();

  const { t } = useTranslation();

  const { data, isLoading } = useSWR(
    [apiKeys.group.getGroupInfoByUuid, groupUuid],
    () => {
      if (groupUuid) return getGroup(groupUuid);
    },
  );

  const handleAcceptInvitation = async () => {};

  return (
    <>
      <div className="area">
        {data && (
          <div className="content flex flex-col items-center text-center px-5">
            <div className="h-20" />

            <Lottie
              animationData={JoinGroupAnimation}
              loop
              className="w-[200px]"
            />

            <p className="font-bold text-2xl mt-2">
              <Trans t={t} i18nKey={"invitationPage.title"}>
                {{ groupName: data?.name || "..." }}
              </Trans>
            </p>

            <p className="mt-4 text-lg text-greyDark mb-20">
              {t("invitationPage.groupAdmin") +
                (data?.president.email || "...")}
            </p>

            <div className={"flex gap-[10px] w-full mt-[30px] justify-center"}>
              <Button
                variant={"outlined"}
                className="w-full py-[15px] text-[18px] md:w-[240px]"
                size="cta"
                onClick={() => {
                  navigator(Path.Home);
                }}
              >
                {t("invitationPage.actions.deny")}
              </Button>

              <Button
                variant={"emphasized"}
                className="w-full py-[15px] text-[18px] md:w-[240px]"
                size="cta"
              >
                {t("invitationPage.actions.accept")}
              </Button>
            </div>
          </div>
        )}

        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default InvitePage;
