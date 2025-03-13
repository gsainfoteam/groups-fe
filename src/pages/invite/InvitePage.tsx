import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import JoinGroupAnimation from "@/assets/animations/JoinGroup.json";
import Lottie from "lottie-react";
import useSWR from "swr";
import apiKeys from "@/types/api-keys";
import {
  getInvitationInfoByInvitationCode,
  joinGroup,
} from "@/apis/group";
import { Trans, useTranslation } from "react-i18next";
import Button from "@/components/button/Button";
import Path from "@/types/paths";
import Loading from "@/components/loading/Loading";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import Error from "@/assets/error/Error";

const InvitePage = () => {
  const { code, groupId } = useParams();
  const navigator = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!code) {
      navigator("/error");
    }
  }, [code]);

  const { data, isLoading, error } = useSWR(
    [apiKeys.group.getInvitationInfoByInvitationCode, code],
    () => {
      if (code) return getInvitationInfoByInvitationCode(code);
    },
    { shouldRetryOnError: false },
  );

  const handleAcceptInvitation = async () => {
    if (!code || !data) return;

    try {
      await joinGroup(code);
      navigator(Path.Home, {
        state: {
          joinedGroupName: data.name,
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMessage(t("invitationPage.error.alreadyInGroup"));
          return;
        } else if (error.response?.status === 403) {
          setErrorMessage(t("invitationPage.error.expired"));
          return;
        } else {
          setErrorMessage(t("common.error"));
        }
      }
    }
  };

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
                {{ groupName: data.name }}
              </Trans>
            </p>

            <p className="mt-4 text-lg text-greyDark mb-20">
              {t("invitationPage.groupAdmin") + data.presidentEmail}
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
                onClick={handleAcceptInvitation}
              >
                {t("invitationPage.actions.accept")}
              </Button>
            </div>

            {errorMessage && (
              <p className="text-primary mt-3">{errorMessage}</p>
            )}
          </div>
        )}

        {isLoading && <Loading />}

        {error && (
          <>
            <div className="h-10" />
            <Error>{t("invitationPage.error.expired")}</Error>
          </>
        )}
      </div>
    </>
  );
};
export default InvitePage;
