import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { IOwner } from "./interface"
import qs from "qs"
import useUser from "../userUser"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetSignedPetitions() {
  const { user } = useUser()
  const userId = user?.owner?.id
  const {
    isFetching: isPetitionsFetching,
    refetch: fetchPetitions,
    data: petitionsData,
    error: petitionFetchError,
  } = useQuery({
    queryKey: [API_KEYS.GET_SIGEND_PETITIONS, userId],
    enabled: !!userId,
    queryFn: async () => {
      const query = qs.stringify(
        {
          fields: ["signedPetitions"],
          populate: {
            signedPetitions: {
              sort: ["updatedAt:desc"],
              fields: ["hideName", "description", "title", "createdAt"],
              populate: {
                image: {
                  fields: ["url"],
                },
                governorate: {
                  fields: ["arName", "enName", "isCountry"],
                },
                category: {
                  fields: ["arName", "enName", "isCountry"],
                },
                petition_stat: {
                  fields: ["views", "shares"],
                },
                creator: {
                  fields: ["arName", "enName", "isPrivileged"],
                  populate: {
                    image: {
                      fields: ["url"],
                    },
                  },
                },
                signers: {
                  fields: ["phoneNumber"],
                },
              },
            },
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        },
      )
      const response = await apiClient.get(`/users/${userId}?${query}`)
      const userResponse = response?.data as IOwner
      return userResponse?.signedPetitions ?? []
    },
  })
  return { isPetitionsFetching, fetchPetitions, petitionsData, petitionFetchError }
}
