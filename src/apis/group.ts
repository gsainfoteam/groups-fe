import groupsApi from "./interceptor";
import { GroupInfo } from "@/types/interfaces";

export const getGroupContainingMe = async (): Promise<GroupInfo[]> => {
  return groupsApi
    .get<{ list: GroupInfo[] }>("/group")
    .then(({ data }) => data.list);
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return groupsApi.get<GroupInfo>(`/group/${uuid}`).then(({ data }) => data);
};

export interface InviteCode {
  code: string;
}

export const generateInviteCode = async (
  uuid: string,
  duration: number,
): Promise<InviteCode> => {
  return groupsApi
    .post<InviteCode>(`/group/${uuid}/invite?duration=${duration}`)
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
  return groupsApi
    .delete(`/group/${uuid}`)
    .then(() => {
      console.log(`Group with UUID ${uuid} has been successfully deleted.`);
    });
};
