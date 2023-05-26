import { useQuery } from "@tanstack/react-query"
import { API_KEYS } from "app/constants/apiKeys"
import apiClient from "app/services/apiClient"

export interface AppInfoResponse {
  PrivacyPolicyAr?: string
  PrivacyPolicyEn?: string
  WebsiteLink?: string
  instagramLink?: string
  phone?: string
  facebookLink?: string
  createdAt?: string
  updatedAt?: string
}

export default function useAppInfo() {
  const {
    isLoading: isLoadingAppInfo,
    refetch: getAppInfo,
    data: appInfoData,
    error: appInfoError,
  } = useQuery({
    queryKey: [API_KEYS.GET_APP_INFO],
    queryFn: async () => {
      const response = await apiClient.get("/app-infos?populate=*")
      return response?.data?.data[0]?.attributes as AppInfoResponse
    },
  })
  return { isLoadingAppInfo, getAppInfo, appInfoData, appInfoError }
}
