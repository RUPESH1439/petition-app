import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Organization } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetOrganization(id: number) {
  const {
    isLoading: isLoadingGetOrganization,
    refetch: getGetOrganization,
    data: getOrganizationData,
    error: getOrganizationError,
  } = useQuery({
    queryKey: [API_KEYS.GET_ORGANIZATION],
    queryFn: async () => {
      const response = await apiClient.get(`/organizations/${id}?populate=*`)
      return response?.data?.data as Organization
    },
  })
  return { isLoadingGetOrganization, getGetOrganization, getOrganizationData, getOrganizationError }
}
