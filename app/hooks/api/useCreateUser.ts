import { useMutation } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { CreateOrganization, CreatePersonalUser } from "./interface"

export default function useCreateUser(type: "personal" | "organization") {
  const isPersonal = type === "personal"

  const {
    isLoading: isCreating,
    isError: isCreateError,
    error: createError,
    mutateAsync: createUser,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: CreatePersonalUser | CreateOrganization) => {
      return apiClient.post(
        isPersonal ? `create-personal-user?populate=*` : `create-organization-user/?populate=*`,
        payload,
      )
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
