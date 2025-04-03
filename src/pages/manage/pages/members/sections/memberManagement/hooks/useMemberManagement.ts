import {
  getGroupMembers,
  grantMemberRole,
  banishMember,
  changePresident,
} from "@/apis/group";
import { MemberResDto } from "@/types/interfaces";
import { useState } from "react";
import { RoleOption } from "./useRoleOptions";

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

  const [selectedMember, setSelectedMember] = useState<MemberResDto | null>(
    null,
  );
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isBanishModalOpen, setIsBanishModalOpen] = useState(false);
  const [isAppointPresidentModalOpen, setIsAppointPresidentModalOpen] =
    useState(false);

  const fetchMembers = async () => {
    try {
      const response = await getGroupMembers(groupUuid);
      setMembers(response);
    } catch (error) {
      console.error("멤버 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const applyRoleChanges = async () => {
    try {
      setLoading(true);

      if (!groupUuid) return;

      const updatePromises = Object.entries(roleChanges).map(
        ([memberUuid, roleChange]) =>
          grantMemberRole(groupUuid, memberUuid, roleChange),
      );

      await Promise.all(updatePromises);
      setRoleChanges({});

      await fetchMembers();
    } catch (error) {
      console.error("역할 업데이트 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async () => {
    if (!selectedMember) return false;

    try {
      await banishMember(groupUuid, selectedMember.uuid);
      await fetchMembers();
      return true;
    } catch (error) {
      console.error("멤버 추방 중 오류 발생:", error);
      return false;
    } finally {
      closeBanishModal();
    }
  };

  const updateRoleChange = (
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

  const selectRole = (role: RoleOption, roleOptions: RoleOption[]) => {
    if (!selectedMember) return;

    const defaultRole =
      roleOptions.find((option) => option.name === selectedMember.role) ??
      roleOptions[0];

    updateRoleChange(selectedMember.uuid, defaultRole.id, role.id);
    setSelectedRole(role);
  };

  const cancelRoleChanges = () => {
    setRoleChanges({});
    closeRoleModal();
  };

  const appointPresident = async () => {
    if (!selectedMember) return false;

    try {
      await changePresident(groupUuid, selectedMember.uuid);
      return true;
    } catch (error) {
      console.error("그룹장 임명 중 오류 발생:", error);
      return false;
    } finally {
      closeAppointPresidentModal();
    }
  };

  const openRoleModal = (member: MemberResDto, role: RoleOption) => {
    setSelectedMember(member);
    setSelectedRole(role);
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
    setSelectedMember(null);
    setSelectedRole(null);
  };

  const openBanishModal = (member: MemberResDto) => {
    setSelectedMember(member);
    setIsBanishModalOpen(true);
  };

  const closeBanishModal = () => {
    setIsBanishModalOpen(false);
    setSelectedMember(null);
  };

  const openAppointPresidentModal = (member: MemberResDto) => {
    setSelectedMember(member);
    setIsAppointPresidentModalOpen(true);
  };

  const closeAppointPresidentModal = () => {
    setIsAppointPresidentModalOpen(false);
    setSelectedMember(null);
  };

  return {
    members,
    loading,
    roleChanges,
    selectedMember,
    selectedRole,
    isRoleModalOpen,
    isBanishModalOpen,
    isAppointPresidentModalOpen,

    fetchMembers,
    applyRoleChanges,
    deleteMember,
    appointPresident,

    updateRoleChange,
    selectRole,
    cancelRoleChanges,

    openRoleModal,
    closeRoleModal,
    openBanishModal,
    closeBanishModal,

    openAppointPresidentModal,
    closeAppointPresidentModal,
  };
};
