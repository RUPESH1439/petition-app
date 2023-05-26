import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Petition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export type PetitionsResponse = Petition[]

export default function useGetPetitions() {
  const {
    isFetching: isPetitionsFetching,
    refetch: fetchPetitions,
    data: petitionsData,
    error: petitionFetchError,
  } = useQuery({
    queryKey: [API_KEYS.GET_PETITIONS],
    queryFn: async () => {
      const response = await apiClient.get("/petitions?populate=*")
      return response?.data?.data as PetitionsResponse
    },
  })
  return { isPetitionsFetching, fetchPetitions, petitionsData, petitionFetchError }
}
