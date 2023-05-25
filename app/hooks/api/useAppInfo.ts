import { useQuery } from "@tanstack/react-query"
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
    queryKey: ["getAppInfo"],
    queryFn: async () => {
      const response = await apiClient.get("/app-infos?populate=*")
      return response?.data?.data[0]?.attributes as AppInfoResponse
    },
  })
  return { isLoadingAppInfo, getAppInfo, appInfoData, appInfoError }
}
