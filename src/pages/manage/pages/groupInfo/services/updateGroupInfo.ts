import { getGroup, changeGroupInfo } from "@/apis/group";
import { GroupInfo } from "@/types/interfaces";

interface GroupInfoUpdateParams {
  field: "name" | "description";
  value: string;
  groupId: string;
}

export const updateGroupInfo = async ({
  field,
  value,
  groupId,
}: GroupInfoUpdateParams): Promise<GroupInfo> => {
  if (!value.trim()) {
    throw new Error(`New ${field} is required`);
  }

  await changeGroupInfo(groupId, { [field]: value });
  return await getGroup(groupId);
};
