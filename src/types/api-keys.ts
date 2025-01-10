const apiKeys = {
  auth: {
    login: "/auth/login",
    info: "/auth/info",
  },
  group: {
    getGroupInfoByUuid: "/groups/{uuid}",
    generateInviteCode: "/groups/{uuid}/invite",
    getInvitationInfoByInvitationCode: "/groups/join",
  },
};

export enum Methods {
  Post = "post",
  Get = "get",
  Patch = "patch",
  Delete = "delete",
}

export default apiKeys;
