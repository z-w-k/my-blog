interface ImportMetaEnv {
  VITE_USE_APIFOX_DATA: boolean
  VITE_APIFOX_API_URL: string
  VITE_API_URL: string
  VITE_BASE_URL: string
  VITE_ENV_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}