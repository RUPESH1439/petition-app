import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Gender } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export type GenderResponse = Gender[]

export default function useGender() {
  const {
    isLoading: isLoadingGender,
    refetch: getGender,
    data: genderData,
    error: genderError,
  } = useQuery({
    queryKey: [API_KEYS.GET_GENDER],
    queryFn: async () => {
      const response = await apiClient.get("/genders?populate=*")
      return response?.data?.data as GenderResponse
    },
  })
  return { isLoadingGender, getGender, genderData, genderError }
}
