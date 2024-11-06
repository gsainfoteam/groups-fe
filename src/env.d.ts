interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_API_URL: string;
  readonly VITE_IDP_BASE_URL: string;
  readonly VITE_IDP_CLIENT_ID: string;
  readonly VITE_IDP_REDIRECT_URI: string;
  readonly VITE_ZIGGLE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
