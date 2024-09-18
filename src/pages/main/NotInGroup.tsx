import { useTranslation } from "react-i18next";

import BonFire from "@/assets/illustrations/bonfire.svg?react";

const NotInGroup = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center ">
      <BonFire />
      <div className="mt-5 text-lg font-semibold text-greyDark">
        {t("group.mainLogo")}
      </div>
    </div>
  );
};

export default NotInGroup;
