import Lottie from "lottie-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import JoinGroupAnimation from "@/assets/animations/JoinGroup.json";
import WarningSign from "@/assets/illustrations/warning-sign.svg?react";

import { useTranslation } from "react-i18next";
import LocalstorageKeys from "@/types/localstorage";
import { oAuthGetToken } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import Path from "@/types/paths";
import Button from "@/components/button/Button";

type IsAuthFailedState = boolean | null;

const LoginPage = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  const [isAuthFailed, setIsAuthFailed] = useState<IsAuthFailedState>(null);

  useOAuthSequence(isAuthFailed, setIsAuthFailed);

  return (
    <>
      <main className="area h-dvh">
        <div className="h-full flex flex-col justify-center items-center">
          {isAuthFailed === null && (
            <>
              <Lottie
                animationData={JoinGroupAnimation}
                loop
                className="w-[200px]"
              />

              <div className="h-1" />

              <p className="text-lg">{t("common.loading")}</p>
            </>
          )}

          {isAuthFailed === true && (
            <>
              <WarningSign className="w-[200px] h-fit" />

              <div className="h-3" />

              <p className="text-lg text-greyDark">
                {t("onboarding.error.description")}
              </p>

              <div className="h-5" />

              <Button
                variant="outlined"
                onClick={() => {
                  navigator(Path.Onboarding);
                }}
              >
                {t("onboarding.error.goBack")}
              </Button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

const useOAuthSequence = (
  isAuthFailed: IsAuthFailedState,
  setIsAuthFailed: Dispatch<SetStateAction<IsAuthFailedState>>,
) => {
  const navigator = useNavigate();

  useEffect(() => {
    oauthSequence(setIsAuthFailed);
  }, []);

  useEffect(() => {
    if (isAuthFailed === false) {
      navigator(Path.Home);
    }
  }, [isAuthFailed]);

  return null;
};

const oauthSequence = async (
  setIsAuthFailed: Dispatch<SetStateAction<IsAuthFailedState>>,
) => {
  const urlParams = new URLSearchParams(window.location.search);

  localStorage.removeItem(LocalstorageKeys.OauthState);

  const code = urlParams.get("code");

  if (!code) {
    setIsAuthFailed(true);
    return;
  }

  const tokenResponse = await oAuthGetToken(code);
  if (!tokenResponse.accessToken) {
    setIsAuthFailed(true);
    return;
  }

  localStorage.setItem(LocalstorageKeys.AccessToken, tokenResponse.accessToken);
  setIsAuthFailed(false);
};

export default LoginPage;
