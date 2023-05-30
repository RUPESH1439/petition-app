import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { IOwner } from "./interface"
import qs from "qs"
import { API_KEYS } from "app/constants/apiKeys"

export default function useGetUserFromId(userId: number) {
  const {
    isFetching: isUserFetching,
    refetch: fetchUser,
    data: userData,
    error: userError,
  } = useQuery({
    queryKey: [API_KEYS.GET_USER_FROM_ID, userId],
    enabled: !!userId,
    queryFn: async () => {
      const query = qs.stringify(
        {
          fields: [
            "facebookLink",
            "instagramLink",
            "websiteLink",
            "image",
            "arName",
            "enName",
            "isPrivileged",
            "signedPetitions",
            "userType",
            "phoneNumber",
          ],
          populate: {
            signedPetitions: {
              fields: ["id"],
            },
            image: {
              fields: ["url"],
            },
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        },
      )
      const response = await apiClient.get(`/users/${userId}?${query}`)
      const userResponse = response?.data as IOwner
      return userResponse
    },
  })
  return { isUserFetching, fetchUser, userData, userError }
}
