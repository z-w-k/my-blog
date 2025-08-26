import { create } from 'zustand'

const useSystemStore = create(() => ({
  useApifoxData: import.meta.env.VITE_USE_APIFOX_DATA,
  apifoxApiUrl: import.meta.env.VITE_APIFOX_API_URL,
  apiUrl: import.meta.env.VITE_API_URL,
  baseUrl: import.meta.env.VITE_BASE_URL,
  envName: import.meta.env.VITE_ENV_NAME,
}))

export default useSystemStore