import { getGroupMembers, grantMemberRole } from "@/apis/group";
import { MemberResDto } from "@/types/interfaces";
import { useState } from "react";

interface UseMemberManagementProps {
  groupUuid: string;
}

export const useMemberManagement = ({
  groupUuid,
}: UseMemberManagementProps) => {
  const [members, setMembers] = useState<MemberResDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [roleChanges, setRoleChanges] = useState<{ [key: string]: number[] }>(
    {},
  );

  const handleRoleChange = (
    memberId: string,
    prevRoleId: number,
    newRoleId: number,
  ) => {
    if (prevRoleId === newRoleId) {
      setRoleChanges((prev) => {
        const newRoleChanges = { ...prev };
        delete newRoleChanges[memberId];
        return newRoleChanges;
      });
    } else {
      setRoleChanges((prev) => ({
        ...prev,
        [memberId]: [prevRoleId, newRoleId],
      }));
    }
  };

  const handleComplete = async () => {
    try {
      setLoading(true);

      if (!groupUuid) return;

      const updatePromises = Object.entries(roleChanges).map(
        ([memberUuid, roleChange]) =>
          grantMemberRole(groupUuid, memberUuid, roleChange),
      );

      await Promise.all(updatePromises);
      setRoleChanges({});

      const updatedMembers = await getGroupMembers(groupUuid);
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Error updating member roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await getGroupMembers(groupUuid);
      setMembers(response);
    } catch (error) {
      console.error("멤버 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  return {
    members,
    loading,
    roleChanges,
    handleRoleChange,
    handleComplete,
    fetchMembers,
    setRoleChanges,
  };
};
