import { RoleAuthorities, RoleNames } from "@/types/interfaces";

const authorityChecker = (
  currentAuthorities: (typeof RoleAuthorities)[keyof typeof RoleAuthorities][],
  requiredAuthorities: (typeof RoleAuthorities)[keyof typeof RoleAuthorities][],
  currentRoleName?: (typeof RoleNames)[keyof typeof RoleNames],
  requiredRoleName?: (typeof RoleNames)[keyof typeof RoleNames],
) => {
  if (requiredRoleName && currentRoleName !== requiredRoleName) {
    return false;
  }
  return currentAuthorities.some((authority) => {
    return requiredAuthorities.includes(authority);
  });
};

export default authorityChecker;
