import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import qs from "qs"
import { Petition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useSearchPetition(searchText: string) {
  const {
    isFetching: isPetitionsFetching,
    refetch: fetchPetitions,
    data: petitionsData,
    error: petitionFetchError,
  } = useQuery({
    queryKey: [API_KEYS.GET_SEARCH_PETITION, searchText],
    queryFn: async () => {
      const query = qs.stringify(
        {
          fields: ["hideName", "description", "title", "createdAt"],
          filters: {
            $or: [
              {
                title: {
                  $contains: searchText,
                },
              },
              {
                creator: {
                  arName: {
                    $contains: searchText,
                  },
                },
              },
              {
                creator: {
                  enName: {
                    $contains: searchText,
                  },
                },
              },
            ],
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
    enabled: !!searchText,
  })

  return { isPetitionsFetching, fetchPetitions, petitionsData, petitionFetchError }
}
