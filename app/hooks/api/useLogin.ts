import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Gender, IError, OrganizationUser, PersonalUser } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"
import * as Application from "expo-application"
import { Platform } from "react-native"

export type GenderResponse = Gender[]

export default function useLogin(phone: string) {
  const {
    isFetching: isLogging,
    refetch: login,
    data: userData,
    error: loginError,
  } = useQuery({
    queryKey: [API_KEYS.LOGIN, phone],
    queryFn: async () => {
      let deviceId = ""
      if (Platform.OS === "ios") {
        deviceId = await Application.getIosIdForVendorAsync()
      }
      if (Platform.OS === "android") {
        deviceId = Application.androidId
      }
      const response = await apiClient
        .get(`/get-user-from-phone/${phone}/${deviceId}`)
        .catch((err) => {
          throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
        })

      return response?.data as PersonalUser | OrganizationUser
    },
    enabled: false,
  })
  return { isLogging, login, userData, loginError: loginError as IError }
}
