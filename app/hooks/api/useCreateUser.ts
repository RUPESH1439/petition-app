import { useMutation } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { CreateOrganization, CreatePersonalUser } from "./interface"
import useLocation from "../useLocation"

export default function useCreateUser(type: "personal" | "organization") {
  const isPersonal = type === "personal"
  const { location } = useLocation()

  const {
    isLoading: isCreating,
    isError: isCreateError,
    error: createError,
    mutateAsync: createUser,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: CreatePersonalUser | CreateOrganization) => {
      return apiClient
        .post(
          isPersonal ? `create-personal-user?populate=*` : `create-organization-user/?populate=*`,
          { ...payload, lat: location?.coords?.latitude, long: location?.coords?.longitude },
        )
        .catch((err) => {
          throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
        })
    },
  })

  return {
    isCreateError,
    isCreating,
    createError,
    createUser,
    isSuccess,
  }
}
