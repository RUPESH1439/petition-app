import { useQuery } from "@tanstack/react-query"
import qs from "qs"
import apiClient from "app/services/apiClient"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetPersonalUsersFromUserIds(userIds: number[]) {
  const {
    isFetching: fetchingPersonalUsers,
    refetch: fetchPersonalUsers,
    data: personalUsers,
    error: fetchPersonalUsersError,
  } = useQuery({
    queryKey: [API_KEYS.GET_PERSONAL_USERS_FROM_USER, userIds],
    queryFn: async () => {
      const query = qs.stringify(
        {
          sort: ["createdAt:desc"],
          fields: ["birthdateYear"],
          filters: {
            owner: {
              id: {
                $in: userIds,
              },
            },
          },
          populate: {
            governorate: {
              fields: ["enName", "isCountry"],
            },
            gender: {
              fields: ["enType"],
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      )
      const response = await apiClient.get(`/personal-users?${query}`).catch((err) => {
        throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
      })
      return response?.data
    },
    enabled: userIds?.length > 0,
  })
  return { fetchingPersonalUsers, fetchPersonalUsers, personalUsers, fetchPersonalUsersError }
}
