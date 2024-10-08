import { UserInfo } from "@/types/interfaces";
import api from "./interceptor";
import apiKeys from "@/types/api-keys";
import generateRandomString from "@/utils/generateRandomString";
import LocalStorageKeys from "@/types/localstorage";

const IDP_BASE_URL = import.meta.env.VITE_IDP_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_IDP_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_IDP_REDIRECT_URI;

export const generateOAuthLoginURL = () => {
  const state = generateRandomString();
  localStorage.setItem(LocalStorageKeys.OAuthState, state);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "openid profile email",
    prompt: "login",
    state,
  });

  const authUrl = `${IDP_BASE_URL}authorize?${params.toString()}`;

  return authUrl;
};

export interface OAuthGetTokenResponse {
  accessToken: string;
}

export const oAuthGetToken = async (code: string) => {
  const response = await api.get<OAuthGetTokenResponse>(apiKeys.auth.login, {
    params: {
      code,
      redirectUri: REDIRECT_URI,
    },
  });

  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get<UserInfo>(apiKeys.auth.info);

  return response.data;
};
