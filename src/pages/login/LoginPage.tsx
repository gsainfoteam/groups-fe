import Lottie from "lottie-react";
import { useEffect } from "react";
import JoinGroupAnimation from "@/assets/animations/JoinGroup.json";
import { useTranslation } from "react-i18next";
import LocalstorageKeys from "@/types/localstorage";

const LoginPage = () => {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <>
      <main className="area h-dvh">
        <div className="h-full flex flex-col justify-center items-center">
          <Lottie
            animationData={JoinGroupAnimation}
            loop
            className="w-[200px]"
          />

          <div className="h-1" />

          <p className="text-lg">{t("common.loading")}</p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
