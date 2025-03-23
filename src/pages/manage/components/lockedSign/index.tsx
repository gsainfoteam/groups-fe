import { RoleNames } from "@/types/interfaces";
import { Lock } from "iconoir-react";
import { Trans, useTranslation } from "react-i18next";
interface LockedSignProps {
  requiredRoleName: (typeof RoleNames)[keyof typeof RoleNames];
}

const LockedSign = ({ requiredRoleName }: LockedSignProps) => {
  return (
    <div className="flex items-center gap-1 text-grey">
      <Lock className="w-6 h-6" />
      <Trans i18nKey="manageGroup.noPermission">{{ requiredRoleName }}</Trans>
    </div>
  );
};

export default LockedSign;
