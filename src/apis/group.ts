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
