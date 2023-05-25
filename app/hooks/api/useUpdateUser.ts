import { useMutation } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { UpdateOrganization, UpdatePersonalUser } from "./interface"
import useUser from "../userUser"

export default function useUpdateUser() {
  const { user } = useUser()
  const isPersonal = user?.owner?.userType === "personal"
  const userId = user?.id

  const {
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError,
    mutateAsync: updateUser,
  } = useMutation({
    mutationFn: (payload: UpdatePersonalUser | UpdateOrganization) => {
      return apiClient.put(
        isPersonal ? `personal-users/${userId}?populate=*` : `organizations/${userId}?populate=*`,
        {
          data: payload,
        },
      )
    },
  })

  return {
    isUpdateError,
    isUpdating,
    updateError,
    updateUser,
  }
}
