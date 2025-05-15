import { UserInfo } from "@/types/interfaces";
import api from "./interceptor";
import apiKeys from "@/types/api-keys";
import LocalStorageKeys from "@/types/localstorage";
import * as client from "openid-client";

const IDP_API_URL = import.meta.env.VITE_IPD_API_URL;
const CLIENT_ID = import.meta.env.VITE_IDP_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_IDP_REDIRECT_URI;

export const generateOAuthLoginURL = async () => {
  try {
    console.log(`${IDP_API_URL}.well-known/openid-configuration`);
    let server: URL = new URL(`${IDP_API_URL}.well-known/openid-configuration`);
    let config = await client.discovery(server, CLIENT_ID);

    const nonce = client.randomNonce();
    const state = client.randomState();
    localStorage.setItem(LocalStorageKeys.OAuthState, state);

    let code_verifier: string = client.randomPKCECodeVerifier();
    let code_challenge = await client.calculatePKCECodeChallenge(code_verifier);

    let parameters: Record<string, string> = {
      response_type: "code",
      client_id: CLIENT_ID,
      code_challenge: code_challenge,
      code_challenge_method: "S256",
      redirect_uri: REDIRECT_URI,
      scope: "openid profile email",
      prompt: "login",
      state: state,
      nonce: nonce,
    };
    const authUrl = client.buildAuthorizationUrl(config, parameters);
    return authUrl.toString();
  } catch (error) {
    console.error("Error in generateOAuthLoginURL:", error);
    return "";
  }
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
