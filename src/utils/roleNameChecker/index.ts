import { ROLE_HIERARCHY, RoleNames } from "@/types/interfaces";

const roleNameChecker = (
  currentRoleName: (typeof RoleNames)[keyof typeof RoleNames],
  requiredRoleName: (typeof RoleNames)[keyof typeof RoleNames],
) => {
  return ROLE_HIERARCHY[currentRoleName] <= ROLE_HIERARCHY[requiredRoleName];
};

export default roleNameChecker;
