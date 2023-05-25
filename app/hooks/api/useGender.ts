import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Gender } from "./interface"

export type GenderResponse = Gender[]

export default function useGender() {
  const {
    isLoading: isLoadingGender,
    refetch: getGender,
    data: genderData,
    error: genderError,
  } = useQuery({
    queryKey: ["getGender"],
    queryFn: async () => {
      const response = await apiClient.get("/genders?populate=*")
      return response?.data?.data as GenderResponse
    },
  })
  return { isLoadingGender, getGender, genderData, genderError }
}
