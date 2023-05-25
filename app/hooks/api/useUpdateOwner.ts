import { useMutation } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { UpdateOwner } from "./interface"
import useUser from "../userUser"

export default function useUpdateOwner() {
  const { user } = useUser()

  const {
    isLoading: isOwnerUpdating,
    isError: isOwnerUpdateError,
    error: ownerUpdateError,
    mutateAsync: updateOwner,
  } = useMutation({
    mutationFn: (userPayload: UpdateOwner) => {
      return apiClient.put(`users/${user?.owner?.id}?populate=*`, userPayload)
    },
  })

  return {
    isOwnerUpdating,
    isOwnerUpdateError,
    ownerUpdateError,
    updateOwner,
  }
}
