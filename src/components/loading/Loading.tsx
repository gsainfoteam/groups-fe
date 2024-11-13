import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import LoadingAnimation from "@/assets/animations/loading.json";
import { ClassValue } from "clsx";
import { cn } from "@/utils/clsx";

interface LoadingProps {
  topSpacing?: ClassValue;
  className?: ClassValue;
  withText?: boolean;
  textClassName?: ClassValue;
}

const Loading = ({
  topSpacing = "h-12",
  className,
  withText = true,
  textClassName,
}: LoadingProps) => {
  const { t } = useTranslation();

  return (
    <div className={"flex flex-col items-center"}>
      <div className={cn(topSpacing)} />
      <Lottie
        animationData={LoadingAnimation}
        loop
        className={cn("w-32 mb-2", className)}
      />
      {withText && (
        <div
          className={cn(
            "text-2xl font-medium text-secondaryText",
            textClassName,
          )}
        >
          {t("common.loading")}
        </div>
      )}
    </div>
  );
};

export default Loading;
