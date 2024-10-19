import dayjs from "dayjs";

import groupsApi from "./interceptor";
import { GroupInfo, UserInfo } from "@/types/interfaces";

export interface InviteCode {
  code: string;
}

export const getGroupContainingMe = async (): Promise<GroupInfo[]> => {
  return groupsApi
    .get<{ list: GroupInfo[] }>("/group")
    .then(({ data }) => data.list);
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return groupsApi.get<GroupInfo>(`/group/${uuid}`).then(({ data }) => data);
};

export const generateInviteCode = async (uuid: string): Promise<InviteCode> => {
  return groupsApi
    .get<InviteCode>(`/group/${uuid}/invite`)
    .then(({ data }) => data);
};

export const createGroup = async (groupData: {
  name: string;
  description: string;
  notionPageId: string;
}) => {
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
