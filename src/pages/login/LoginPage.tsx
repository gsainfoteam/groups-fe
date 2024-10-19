import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import JoinGroupAnimation from "@/assets/animations/JoinGroup.json";
import WarningSign from "@/assets/illustrations/warning-sign.svg?react";

import { useTranslation } from "react-i18next";
import LocalStorageKeys from "@/types/localstorage";
import { oAuthGetToken } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import Path from "@/types/paths";
import Button from "@/components/button/Button";

type AuthStatus = "loading" | "success" | "failed";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  const { authStatus, errorMessage } = useOAuthSequence();

  useEffect(() => {
    if (authStatus === "success") navigator(Path.Home);
  }, [authStatus]);

  return (
    <>
      <main className="area h-dvh">
        <div className="h-full flex flex-col justify-center items-center">
          {authStatus === "loading" && (
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

          {authStatus === "failed" && (
            <>
              <WarningSign className="w-[200px] h-fit" />

              <div className="h-3" />

              <p className="text-lg text-greyDark mb-1">
                {t("onboarding.error.description")}
              </p>
              <p className="text-lg text-greyDark">{errorMessage}</p>

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

const useOAuthSequence = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const performOAuthSequence = async () => {
      try {
        const result = await oauthSequence();

        setAuthStatus(result ? "success" : "failed");
      } catch (error) {
        console.error("OAuth sequence failed:", error);
        setAuthStatus("failed");
      }
    };

    performOAuthSequence();
  }, []);

  return {
    authStatus,
    errorMessage,
  };
};

interface OAuthSequenceResult {
  isSuccessful: boolean;
  errorMessage?: string;
}

const oauthSequence = async (): Promise<OAuthSequenceResult> => {
  const urlParams = new URLSearchParams(window.location.search);

  const state = urlParams.get("state");
  const oauthStateFromLocal = localStorage.getItem(LocalStorageKeys.OAuthState);
  if (state !== oauthStateFromLocal) {
    return {
      isSuccessful: false,
      errorMessage: "Requested state and local state are different",
    };
  }
  localStorage.removeItem(LocalStorageKeys.OAuthState);

  const code = urlParams.get("code");

  if (!code) {
    return {
      isSuccessful: false,
      errorMessage: "Missing OAuth Code",
    };
  }

  try {
    const tokenResponse = await oAuthGetToken(code);
    if (!tokenResponse.accessToken) {
      return {
        isSuccessful: false,
        errorMessage: "Missing AccessToken",
      };
    }

    localStorage.setItem(
      LocalStorageKeys.AccessToken,
      tokenResponse.accessToken,
    );

    return {
      isSuccessful: true,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccessful: false,
      errorMessage: "Unknown error",
    };
  }
};

export default LoginPage;
