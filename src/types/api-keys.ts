const apiKeys = {
  auth: {
    login: "/auth/login",
    info: "/auth/info",
  },
  group: {
    generateInviteCode: "/groups/{uuid}/invite",
  },
};

export enum Methods {
  Post = "post",
  Get = "get",
  Patch = "patch",
  Delete = "delete",
}

export default apiKeys;
