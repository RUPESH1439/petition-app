import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import qs from "qs"
import useUser from "../userUser"
import { Petition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetCreatedPetitions() {
  const { user } = useUser()
  const userId = user?.owner?.id
  const {
    isFetching: isPetitionsFetching,
    refetch: fetchPetitions,
    data: petitionsData,
    error: petitionFetchError,
  } = useQuery({
    queryKey: [API_KEYS.GET_CREATED_PETITIONS, userId],
    enabled: !!userId,
    queryFn: async () => {
      const query = qs.stringify(
        {
          fields: ["hideName", "description", "title", "createdAt"],
          filters: {
            creator: {
              id: {
                $eq: userId,
              },
            },
          },
          populate: {
            creator: {
              fields: ["arName", "enName", "isPrivileged"],
            },
            petition_stat: {
              fields: ["views", "shares"],
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
          },
        },
        {
          encodeValuesOnly: true,
        },
      )
      const response = await apiClient.get(`/petitions?${query}`)
      return response?.data?.data as Petition[]
    },
  })
  return { isPetitionsFetching, fetchPetitions, petitionsData, petitionFetchError }
}
