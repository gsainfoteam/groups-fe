import GroupsLogoDark from "@/assets/logos/groups-dark.svg?react";
import GroupsLogo from "@/assets/logos/groups.svg?react";
import Button from "@/components/button/Button";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { generateOAuthLoginURL } from "@/apis/auth";
import Path from "@/types/paths";
import { useEffect, useState } from "react";
import LocalStorageKeys from "@/types/localstorage";
const OnboardingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [OAuthLoginURL, setOAuthLoginURL] = useState<string>("");
  useEffect(() => {
    const fetchOAuthLoginURL = async () => {
      const url = await generateOAuthLoginURL();
      console.log("OAuthLoginURL", url);
      setOAuthLoginURL(url);
    };
    fetchOAuthLoginURL();
  }, []);
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
              onClick={() => {
                localStorage.setItem(
                  LocalStorageKeys.ReturnTo,
                  location.state?.returnTo ?? "/",
                );

                window.location.href = OAuthLoginURL;
              }}
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
