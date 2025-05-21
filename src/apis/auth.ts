import { UserInfo } from "@/types/interfaces";
import api from "./interceptor";
import apiKeys from "@/types/api-keys";
import LocalStorageKeys from "@/types/localstorage";
import * as client from "openid-client";
import { Location } from "react-router-dom";

const IDP_API_URL = import.meta.env.VITE_IPD_API_URL;
const CLIENT_ID = import.meta.env.VITE_IDP_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_IDP_REDIRECT_URI;
export const generateOAuthLoginURL = async () => {
  try {
    let server: URL = new URL(`${IDP_API_URL}.well-known/openid-configuration`);
    let config = await client.discovery(server, CLIENT_ID);

    const nonce = client.randomNonce();
    const state = client.randomState();

    localStorage.setItem(LocalStorageKeys.OAuthNonce, nonce);
    localStorage.setItem(LocalStorageKeys.OAuthState, state);

    let code_verifier: string = client.randomPKCECodeVerifier();
    let code_challenge = await client.calculatePKCECodeChallenge(code_verifier);

    localStorage.setItem(LocalStorageKeys.CodeVerifier, code_verifier);
    sessionStorage.setItem(LocalStorageKeys.CodeVerifier, code_verifier);

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

export const oAuthGetToken = async (state: string, currentURL: URL) => {
  const server: URL = new URL(`${IDP_API_URL}.well-known/openid-configuration`);
  const config = await client.discovery(server, CLIENT_ID);

  const local_state = localStorage.getItem(LocalStorageKeys.OAuthState);
  const code_verifier = localStorage.getItem(LocalStorageKeys.CodeVerifier);
  const code_nonce = localStorage.getItem(LocalStorageKeys.OAuthNonce);

  if (!code_verifier) {
    throw new Error("Missing code verifier");
  }
  if (!code_nonce) {
    throw new Error("Missing code nonce");
  }
  if (!local_state) {
    throw new Error("Missing local state");
  } else if (local_state !== state) {
    throw new Error("State mismatch");
  }

  try {
    const token = await client.authorizationCodeGrant(config, currentURL, {
      pkceCodeVerifier: code_verifier,
      expectedState: state,
      expectedNonce: code_nonce,
    });
    return token;
  } catch (err) {
    console.error("OAuth token error:", err);
    throw err;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get<UserInfo>(apiKeys.auth.info);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info");
  }
};

export const generateLoginURLHandler = async (location: Location) => {
  try {
    localStorage.setItem(
      LocalStorageKeys.ReturnTo,
      location.state?.returnTo ?? "/",
    );
    window.location.href = await generateOAuthLoginURL();
  } catch (error) {
    console.error("Error generating login URL:", error);
    throw new Error("Failed to generate login URL");
  }
};
