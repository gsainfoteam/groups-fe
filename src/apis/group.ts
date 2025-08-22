import groupsApi from "./interceptor";
import {
  CompactGroupInfo,
  ExpandedGroupInfo,
  GroupInfo,
  GroupInfoWithPresidentUuid,
  MemberResDto,
  RolePermissiosns,
  RoleNames,
} from "@/types/interfaces";

export const getGroupContainingMe = async (): Promise<
  GroupInfoWithPresidentUuid[]
> => {
  return groupsApi
    .get<{ list: GroupInfoWithPresidentUuid[] }>("/group")
    .then(({ data }) => data.list);
};

export const getGroup = async (uuid: string): Promise<ExpandedGroupInfo> => {
  return groupsApi
    .get<ExpandedGroupInfo>(`/group/${uuid}`)
    .then(({ data }) => data);
};

export interface InviteCode {
  code: string;
}

export const generateInviteCode = async (
  uuid: string,
  duration: number,
  roleId: number,
): Promise<InviteCode> => {
  return groupsApi
    .post<InviteCode>(
      `/group/${uuid}/invite?duration=${duration}&roleId=${roleId}`,
    )
    .then(({ data }) => data);
};

interface CreateGroupRequest {
  name: string;
  description: string;
  notionPageId: string;
}

export const createGroup = async (groupData: CreateGroupRequest) => {
  return groupsApi
    .post<GroupInfo>(`/group`, groupData)
    .then(({ data }) => data);
};

export const setGroupProfileImage = async (id: string, image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await groupsApi.post(`/group/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

interface CheckGroupExistsByNameResponse {
  exist: boolean;
}

export const checkGroupExistsByName = async (groupName: string) => {
  return groupsApi
    .get<CheckGroupExistsByNameResponse>(`/group/${groupName}/exist`)
    .then(({ data }) => data);
};

interface GetInvitationInfoByInvitationCodeResponse {
  presidentEmail: string;
  name: string;
}

export const getInvitationInfoByInvitationCode = async (code: string) => {
  return groupsApi
    .get<GetInvitationInfoByInvitationCodeResponse>(`/group/join?code=${code}`)
    .then(({ data }) => data);
};

export const joinGroup = async (code: string) => {
  return groupsApi.post("/group/join", { code }).then((response) => response);
};

export const deleteGroup = async (uuid: string): Promise<void> => {
  return groupsApi.delete(`/group/${uuid}`).then(() => {
    console.log(`Group with UUID ${uuid} has been successfully deleted.`);
  });
};

export const changeGroupInfo = async (
  uuid: string,
  body: CompactGroupInfo,
): Promise<void> => {
  return groupsApi.patch(`/group/${uuid}`, body).then(() => {
    console.log(`Group info of ${uuid} updated successfully.`);
  });
};

export const getGroupMembers = async (
  uuid: string,
): Promise<MemberResDto[]> => {
  return groupsApi
    .get<{ list: MemberResDto[] }>(`/group/${uuid}/member`)
    .then(({ data }) => data.list);
};

export const banishMember = async (
  groupUuid: string,
  memberUuid: string,
): Promise<void> => {
  return groupsApi
    .delete(`/group/${groupUuid}/member/${memberUuid}`)
    .then(() => {
      console.log(
        `Member with uuid ${memberUuid} successfully left the group.`,
      );
    });
};

export const grantMemberRole = async (
  groupUuid: string,
  memberUuid: string,
  roleChange: number[],
): Promise<void> => {
  try {
    if (roleChange[0] !== 0)
      await groupsApi.delete(
        `/group/${groupUuid}/member/${memberUuid}/role?roleId=${roleChange[0]}`,
      );
    return groupsApi.patch(
      `/group/${groupUuid}/member/${memberUuid}/role?roleId=${roleChange[1]}`,
    );
  } catch (error) {
    console.error("Error updating member roles:", error);
    throw new Error("Error updating member roles:");
  }
};

export const createRole = async (
  groupUuid: string,
  roleName: string,
  perminsions: string[],
): Promise<void> => {
  return groupsApi
    .post(`/group/${groupUuid}/role`, {
      name: roleName,
      perminsions: perminsions,
    })
    .then(() => {
      console.log(`Default role ${roleName} set successfully.`);
    });
};

interface GetUserRoleResponse {
  id: number;
  name: (typeof RoleNames)[keyof typeof RoleNames];
  groupUuid: string;
  permissions: (typeof RolePermissiosns)[keyof typeof RolePermissiosns][];
}

export const getUserRole = async (groupId: string) => {
  return groupsApi
    .get<GetUserRoleResponse>(`/group/${groupId}/role`)
    .then(({ data }) => {
      console.log(data)
      return data
    });
};

export const leavingGroup = async (GroupUuid: string) => {
  return groupsApi
    .delete(`/group/${GroupUuid}/member/leave`)
    .then(() => {
      console.log(`Successfully withdrew from the group`);
    })
    .catch((err) => console.error(err));
};

export const changePresident = async (
  groupUuid: string,
  newPresidentUuid: string,
) => {
  return groupsApi.patch(`/group/${groupUuid}/president`, {
    newPresidentUuid,
  });
};

export const thirdPartyAuthorize = async (
  clientId: string,
  redirectURI: string,
) => {
  const encodedRedirectURI = encodeURIComponent(redirectURI);
  return groupsApi.get(
    `/third-party/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectURI}`,
  );
};
