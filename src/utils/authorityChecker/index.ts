import { RoleAuthorities } from "@/types/interfaces";

const authorityChecker = (
  currentAuthorities: (typeof RoleAuthorities)[keyof typeof RoleAuthorities][],
  requiredAuthorities: (typeof RoleAuthorities)[keyof typeof RoleAuthorities][],
) => {
  return requiredAuthorities.every((authority) => {
    return currentAuthorities.includes(authority);
  });
};

export default authorityChecker;
