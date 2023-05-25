import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Petition } from "./interface"

export type PetitionsResponse = Petition[]

export default function useGetPetitions() {
  const {
    isFetching: isPetitionsFetching,
    refetch: fetchPetitions,
    data: petitionsData,
    error: petitionFetchError,
  } = useQuery({
    queryKey: ["getPetitions"],
    queryFn: async () => {
      const response = await apiClient.get("/petitions?populate=*")
      return response?.data?.data as PetitionsResponse
    },
  })
  return { isPetitionsFetching, fetchPetitions, petitionsData, petitionFetchError }
}
