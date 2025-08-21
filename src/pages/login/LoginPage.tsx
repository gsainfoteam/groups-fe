import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import JoinGroupAnimation from "@/assets/animations/JoinGroup.json";
import WarningSign from "@/assets/illustrations/warning-sign.svg?react";

import { useTranslation } from "react-i18next";
import LocalStorageKeys from "@/types/localstorage";
import { groupsLogin, oAuthGetToken } from "@/apis/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import Path from "@/types/paths";
import Button from "@/components/button/Button";
import Error from "@/assets/error/Error";
import Loading from "@/components/loading/Loading";

type AuthStatus = "loading" | "success" | "failed";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { authStatus, errorMessage } = useOAuthSequence();

  useEffect(() => {
    if (authStatus === "success") {
      const savedReturnTo = localStorage.getItem(LocalStorageKeys.ReturnTo);

      localStorage.removeItem(LocalStorageKeys.ReturnTo);

      if (savedReturnTo) {
        navigate(savedReturnTo);
      }
    }
  }, [authStatus, navigate]);

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

              <Loading />
            </>
          )}

          {authStatus === "failed" && (
            <>
              <Error
                redirectTo={Path.Onboarding}
                redirectButtonValue={t("onboarding.error.goBack")}
              >
                <p className="text-lg text-greyDark mb-1">
                  {t("onboarding.error.description")}
                </p>
                <p className="text-lg text-greyDark">{errorMessage}</p>
              </Error>
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

        setAuthStatus(result.isSuccessful ? "success" : "failed");
        if (result.errorMessage) {
          setErrorMessage(result.errorMessage);
        }
      } catch (error) {
        console.error("OAuth sequence failed:", error);
        setAuthStatus("failed");
        setErrorMessage("unknown error");
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
  const localState = localStorage.getItem(LocalStorageKeys.OAuthState);
  const state = urlParams.get("state");
  if (!state) {
    return {
      isSuccessful: false,
      errorMessage: "There is no state from OAuth",
    };
  } else if (localState !== state) {
    return {
      isSuccessful: false,
      errorMessage: "State mismatch",
    };
  }
  const code = urlParams.get("code");
  if (!code) {
    return {
      isSuccessful: false,
      errorMessage: "Missing OAuth Code",
    };
  }

  try {
    const currentURL = new URL(window.location.href);
    const tokenResponse = await oAuthGetToken(state, currentURL);

    if (!tokenResponse) {
      return {
        isSuccessful: false,
        errorMessage: "Missing TokenResponse",
      };
    }
    localStorage.removeItem(LocalStorageKeys.OAuthState);
    localStorage.removeItem(LocalStorageKeys.CodeVerifier);
    localStorage.removeItem(LocalStorageKeys.OAuthNonce);
    localStorage.setItem(
      LocalStorageKeys.AccessToken,
      tokenResponse.access_token,
    );
    await groupsLogin(tokenResponse.access_token);
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
