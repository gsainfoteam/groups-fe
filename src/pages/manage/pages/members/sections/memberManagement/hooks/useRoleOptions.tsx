import { Crown, Hat, User, Wrench } from "iconoir-react";
import { SVGProps } from "react";
import { ForwardRefExoticComponent } from "react";
import { RefAttributes } from "react";
import { useTranslation } from "react-i18next";

export interface RoleOption {
  id: number;
  value: string;
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const useRoleOptions = (): RoleOption[] => {
  const { t } = useTranslation();

  const roleOptions = [
    { id: 0, value: t("role.president"), icon: Crown, name: "president" },
    { id: 1, value: t("role.admin"), icon: Wrench, name: "admin" },
    { id: 2, value: t("role.manager"), icon: Hat, name: "manager" },
    { id: 3, value: t("role.member"), icon: User, name: "member" },
  ];

  return roleOptions;
};

export default useRoleOptions;
