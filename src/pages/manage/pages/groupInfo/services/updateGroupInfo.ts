import { getGroup, changeGroupInfo } from "@/apis/group";
import { ExpandedGroupInfo, GroupInfo } from "@/types/interfaces";

interface GroupInfoUpdateParams {
  field: "name" | "description";
  value: string;
  groupId: string;
}

export const updateGroupInfo = async ({
  field,
  value,
  groupId,
}: GroupInfoUpdateParams): Promise<ExpandedGroupInfo> => {
  if (!value.trim()) {
    throw new Error(`New ${field} is required`);
  }

  await changeGroupInfo(groupId, { [field]: value });
  return await getGroup(groupId);
};
