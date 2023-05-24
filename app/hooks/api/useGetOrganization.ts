import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Organization } from "./interface"

export default function useGetOrganization(id: number) {
  const {
    isLoading: isLoadingGetOrganization,
    refetch: getGetOrganization,
    data: getOrganizationData,
    error: getOrganizationError,
  } = useQuery({
    queryKey: ["getOrganization"],
    queryFn: async () => {
      const response = await apiClient.get(`/organizations/${id}?populate=*`)
      return response?.data?.data as Organization
    },
  })
  return { isLoadingGetOrganization, getGetOrganization, getOrganizationData, getOrganizationError }
}
