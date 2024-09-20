import { UserInfo } from "@/types/interfaces";
import LocalstorageKeys from "@/types/localstorage";
import generateRandomString from "@/utils/generateRandomString";
import axios from "axios";

const IDP_BASE_URL = import.meta.env.VITE_IDP_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_IDP_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_IDP_REDIRECT_URI;

export const oAuthLogin = () => {
  const state = generateRandomString();
  localStorage.setItem(LocalstorageKeys.OauthState, state);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "openid profile email",
    state: state,
    prompt: "consent",
  });

  const authUrl = `${IDP_BASE_URL}authorize?${params.toString()}`;

  window.location.href = authUrl;
};

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export const oAuthExchangeCodeForToken = async (code: string) => {
  const response = await axios.post<TokenResponse>(
    `${IDP_BASE_URL}oauth2/token`,
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
};

export const oAuthGetUserInfoByAccessToken = async (accessToken: string) => {
  const response = await axios.get<UserInfo>(`${IDP_BASE_URL}oauth/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
