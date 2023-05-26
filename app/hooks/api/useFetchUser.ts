import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { IError } from "./interface"
import useUser from "../userUser"
import formatUserData from "app/utils/api/formatUserData"
import { API_KEYS } from "app/constants/apiKeys"

export default function useFetchUser() {
  const { user } = useUser()
  const isPersonal = user?.owner?.userType === "personal"
  const userId = user?.id
  const {
    isFetching: fetchingUser,
    refetch: fetchUser,
    data: userData,
    error: fetchUserError,
  } = useQuery({
    queryKey: [API_KEYS.FETCH_USER, isPersonal, userId],
    queryFn: async () => {
      const response = await apiClient
        .get(
          isPersonal
            ? `/personal-users/${userId}?populate=*`
            : `/personal-users/${userId}?populate=*`,
        )
        .catch((err) => {
          throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
        })
      return formatUserData(response)
    },
    enabled: false,
  })
  return { fetchingUser, fetchUser, userData, loginError: fetchUserError as IError }
}
