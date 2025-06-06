import Button from "@/components/button/Button";
import { RoleOption } from "./hooks/useRoleOptions";
import { useTranslation } from "react-i18next";

import { cn } from "@/utils/clsx";
import { Check } from "iconoir-react";

interface RoleSelectionModalProps {
  roleOptions: RoleOption[];
  selectedRole: RoleOption;
  targetMemberName: string;
  onRoleSelect: (role: RoleOption) => void;
}

const RoleSelectionModal = ({
  roleOptions,
  selectedRole,
  targetMemberName,
  onRoleSelect,
}: RoleSelectionModalProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full text-center">
      <h2 className="text-dark w-full dark:text-grey px-6 font-semibold text-2xl">
        {t("manageGroup.members.list.changeRoleModal.title")}
      </h2>
      <p className="text-greyDark w-full px-6 font-regular mt-2">
        {targetMemberName}
      </p>

      <div className="my-5 border-b-greyBorder border-b border-solid w-full">
        {roleOptions.map((roleOption) => {
          const isThisRoleSelected = roleOption.id === selectedRole.id;

          return (
            <Button
              key={roleOption.id}
              className={cn(
                "py-3 px-6 bg-greyLight flex justify-between items-center border-t border-solid border-t-greyBorder w-full",
                isThisRoleSelected ? "text-primary" : "text-dark dark:text-grey",
              )}
              onClick={() => onRoleSelect(roleOption)}
            >
              <div className="flex items-center gap-4">
                <roleOption.icon className="w-6 h-6" />

                <div className="font-medium">{roleOption.value}</div>
              </div>

              {isThisRoleSelected ? <Check className="w-6 h-6" /> : <div />}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelectionModal;
