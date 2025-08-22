import { RolePermissiosns } from "@/types/interfaces";

const authorityChecker = (
  currentAuthorities: (typeof RolePermissiosns)[keyof typeof RolePermissiosns][],
  requiredAuthorities: (typeof RolePermissiosns)[keyof typeof RolePermissiosns][],
) => {
  return requiredAuthorities.every((authority) => {
    return currentAuthorities.includes(authority);
  });
};

export default authorityChecker;
