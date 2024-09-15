import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import CatBounceAnimation from "@/assets/animations/cat-bounce.json";

const LoadingCatAnimation = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Lottie animationData={CatBounceAnimation} loop className="w-40" />
      <div className="text-2xl font-medium text-secondaryText">
        {t("loading")}
      </div>
    </div>
  );
};

export default LoadingCatAnimation;
