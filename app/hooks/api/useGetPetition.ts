import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import qs from "qs"
import { Petition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetPetition(id: number) {
  const {
    isFetching: isPetitionFetching,
    refetch: fetchPetition,
    data: petitionData,
    error: petitionFetchError,
    isInitialLoading: petitionInitalLoading,
  } = useQuery({
    queryKey: [API_KEYS.GET_PETITION, id],
    queryFn: async () => {
      const query = qs.stringify(
        {
          sort: ["createdAt:desc"],
          fields: ["hideName", "description", "title", "createdAt"],
          populate: {
            creator: {
              fields: ["arName", "enName", "isPrivileged", "userType"],
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
            petition_stat: {
              fields: ["views", "shares"],
              populate: {
                viewers: {
                  fields: ["phoneNumber"],
                },
              },
            },
            governorate: {
              fields: ["arName", "enName", "isCountry"],
            },
            category: {
              fields: ["arName", "enName"],
            },
            signers: {
              fields: ["phoneNumber"],
            },
            image: {
              fields: ["url"],
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      )
      const response = await apiClient.get(`/petitions/${id}?${query}`)
      return response?.data?.data as Petition
    },
    enabled: !!id,
  })
  return {
    isPetitionFetching,
    fetchPetition,
    petitionData,
    petitionFetchError,
    petitionInitalLoading,
  }
}
