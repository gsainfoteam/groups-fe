import GroupsLogoDark from "@/assets/logos/groups-dark.svg?react";
import GroupsLogo from "@/assets/logos/groups.svg?react";
import Button from "@/components/button/Button";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LocalStorageKeys from "@/types/localstorage";
import { generateLoginURLHandler, generateOAuthLoginURL } from "@/apis/auth";
import useAuth from "@/hooks/useAuth";

const OnboardingPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  if (userInfo?.name) navigate("/");

  return (
    <>
      <main className="area">
        <div className="content">
          <div className="h-[calc(100dvh-100px)] flex flex-col justify-center items-center">
            <section className="w-full">
              <div className="block dark:hidden w-full">
                <GroupsLogo className="h-[80px] overflow-visible" />
              </div>
              <div className="hidden dark:block w-full">
                <GroupsLogoDark className="h-[80px] overflow-visible" />
              </div>
            </section>

            <div className="h-6" />

            <p className="text-xl md:text-2xl font-semibold">
              {t("onboarding.description")}
            </p>

            <div className="h-8" />

            <Button
              variant="outlined"
              size="cta"
              onClick={() => generateLoginURLHandler(location.pathname)}
            >
              {t("onboarding.cta")}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default OnboardingPage;
//onboarding
