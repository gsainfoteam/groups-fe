import dayjs from "dayjs";

import groupsApi from "./interceptor";

export interface GroupUser {
  uuid: string;
  name: string;
  email: string;
  createdAt: dayjs.Dayjs | string;
}
export interface GroupInfo {
  uuid: string;
  name: string;
  description: string;
  createdAt: dayjs.Dayjs | string;
  presidentUuid: string;
  president: GroupUser;
  memberCount: number;
}

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

export const getMyInfo = async (): Promise<GroupInfo> => {
  return groupsApi.get<GroupInfo>("/auth/info").then(({ data }) => data);
};

export const groupsLogin = async (): Promise<void> => {
  return groupsApi.get("/auth").then(() => {});
};
