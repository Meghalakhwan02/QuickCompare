/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __ENV__?: {
    VITE_FACE_API_URL?: string;
  };
}