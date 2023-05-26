import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Governorate } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

type GovernorateResponse = Governorate[]

export default function useGovernorate() {
  const {
    isFetching: isLoadingGovernorate,
    refetch: getGovernorate,
    data: governorateData,
    error: governorateError,
  } = useQuery({
    queryKey: [API_KEYS.GET_GOVERNORATE],
    queryFn: async () => {
      const response = await apiClient.get("/governorates?populate=*")
      return response?.data?.data as GovernorateResponse
    },
  })
  return { isLoadingGovernorate, getGovernorate, governorateData, governorateError }
}
