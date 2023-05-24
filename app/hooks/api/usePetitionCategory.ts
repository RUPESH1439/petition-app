import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { PetitionCategory } from "./interface"

type PetitionCategoryResponse = PetitionCategory[]

export default function usePetitionCategory() {
  const {
    isLoading: isLoadingPetitionCategory,
    refetch: getPetitionCategory,
    data: petitionCategoryData,
    error: petitionCategoryError,
  } = useQuery({
    queryKey: ["getPetitionCategory"],
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
