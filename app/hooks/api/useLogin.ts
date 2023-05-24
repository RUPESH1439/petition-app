import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { Gender, IError, OrganizationUser, PersonalUser } from "./interface"

export type GenderResponse = Gender[]

export default function useLogin(phone: string) {
  const {
    isFetching: isLogging,
    refetch: login,
    data: userData,
    error: loginError,
  } = useQuery({
    queryKey: ["login", phone],
    queryFn: async () => {
      const response = await apiClient.get(`/get-user-from-phone/${phone}`).catch((err) => {
        throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
      })

      return response?.data as PersonalUser | OrganizationUser
    },
    enabled: false,
  })
  return { isLogging, login, userData, loginError: loginError as IError }
}
