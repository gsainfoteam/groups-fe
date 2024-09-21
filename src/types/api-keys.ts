const apiKeys = {
  auth: {
    login: "/auth/login",
    info: "/auth/info",
  },
};

export enum Methods {
  Post = "post",
  Get = "get",
  Patch = "patch",
  Delete = "delete",
}

export default apiKeys;
