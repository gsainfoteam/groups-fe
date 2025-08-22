import { RolePermissions } from "@/types/interfaces";

const authorityChecker = (
  currentAuthorities: (typeof RolePermissions)[keyof typeof RolePermissions][],
  requiredAuthorities: (typeof RolePermissions)[keyof typeof RolePermissions][],
) => {
  return requiredAuthorities.every((authority) => {
    return currentAuthorities.includes(authority);
  });
};

export default authorityChecker;
