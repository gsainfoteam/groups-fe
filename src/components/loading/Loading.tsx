import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import LoadingAnimation from "@/assets/animations/loading.json";

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Lottie animationData={LoadingAnimation} loop className="w-32 mb-2" />
      <div className="text-2xl font-medium text-secondaryText">
        {t("common.loading")}
      </div>
    </div>
  );
};

export default Loading;
