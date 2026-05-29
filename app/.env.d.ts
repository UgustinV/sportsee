/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly USE_MOCK: string;
  readonly SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}