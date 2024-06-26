import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import qs from "qs"
import { Petition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetPetitions(governorates: number[]) {
  const {
    isFetching: isPetitionsFetching,
    refetch: fetchPetitions,
    data: petitionsData,
    error: petitionFetchError,
    isInitialLoading: petitionInitalLoading,
  } = useQuery({
    queryKey: [API_KEYS.GET_PETITIONS, governorates],
    queryFn: async () => {
      const query = qs.stringify(
        {
          sort: ["createdAt:desc"],
          fields: ["hideName", "description", "title", "createdAt"],
          filters: {
            governorate: {
              id: {
                $eq: governorates,
              },
            },
          },
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
              fields: ["arName", "enName", "isCountry"],
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
      const response = await apiClient.get(`/petitions?${query}`)
      return response?.data?.data as Petition[]
    },
    enabled: !!governorates,
  })
  return {
    isPetitionsFetching,
    fetchPetitions,
    petitionsData,
    petitionFetchError,
    petitionInitalLoading,
  }
}
