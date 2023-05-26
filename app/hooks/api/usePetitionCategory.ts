import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { PetitionCategory } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

type PetitionCategoryResponse = PetitionCategory[]

export default function usePetitionCategory() {
  const {
    isLoading: isLoadingPetitionCategory,
    refetch: getPetitionCategory,
    data: petitionCategoryData,
    error: petitionCategoryError,
  } = useQuery({
    queryKey: [API_KEYS.GET_PETITION_CATEGORY],
    queryFn: async () => {
      const response = await apiClient.get("categories?populate=*")
      return response?.data?.data as PetitionCategoryResponse
    },
  })
  return {
    isLoadingPetitionCategory,
    getPetitionCategory,
    petitionCategoryData,
    petitionCategoryError,
  }
}
