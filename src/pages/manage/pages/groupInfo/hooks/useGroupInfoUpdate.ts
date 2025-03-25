import { ExpandedGroupInfo, GroupInfo } from "@/types/interfaces";
import { updateGroupInfo } from "../services/updateGroupInfo";

interface UseGroupInfoUpdateProps {
  group: ExpandedGroupInfo;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useGroupInfoUpdate = ({
  group,

  onSuccess,
  onError,
}: UseGroupInfoUpdateProps) => {
  const updateInfo = async (field: "name" | "description", value: string) => {
    try {
      const updatedGroup = await updateGroupInfo({
        field,
        value,
        groupId: group.uuid,
      });
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      onError?.(new Error(errorMessage));
    }
  };

  return { updateInfo };
};
