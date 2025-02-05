import dayjs from "dayjs";

export interface UserInfo {
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
  verifiedAt: dayjs.Dayjs | string | null;
  notionPageId: string;
  profileImageKey: string | null;
  profileImageUrl: string | null;
  verified: boolean;
}

export interface GroupInfoWithPresidentUuid extends GroupInfo {
  presidentUuid: string;
}

export interface ExpandedGroupInfo extends GroupInfo {
  memberCount: number;
  president: UserInfo;
}

export interface CompactGroupInfo {
  name?: string;
  description?: string;
  notionPageId?: string;
}

export interface Notice {
  id: number;
  title: string;
  deadline: dayjs.Dayjs | string | null;
  currentDeadline: dayjs.Dayjs | string | null;
  langs: string[];
  content: string;
  author: {
    name: string;
    uuid: string;
  };
  createdAt: dayjs.Dayjs | string;
  tags: string[];
  views: number;
  imageUrls: string[];
  documentUrls: string[];
  isReminded: boolean;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  isReacted: boolean;
}

export enum EmojiString {
  FIRE = "🔥",
  CRYING = "😭",
  ANGUISHED = "😧",
  THINKING = "🤔",
  SURPRISED = "😮",
}

export interface MemberResDto {
  uuid: string;
  name: string;
  email: string;
  role: string;
}
