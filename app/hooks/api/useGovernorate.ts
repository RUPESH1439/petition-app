import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Governorate } from "./interface"

type GovernorateResponse = Governorate[]

export default function useGovernorate() {
  const {
    isFetching: isLoadingGovernorate,
    refetch: getGovernorate,
    data: governorateData,
    error: governorateError,
  } = useQuery({
    queryKey: ["getGovernorate"],
    queryFn: async () => {
      const response = await apiClient.get("/governorates?populate=*")
      return response?.data?.data as GovernorateResponse
    },
  })
  return { isLoadingGovernorate, getGovernorate, governorateData, governorateError }
}
