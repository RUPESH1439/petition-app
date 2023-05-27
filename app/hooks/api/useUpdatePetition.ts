import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { EditPetition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useUpdatePetition() {
  const queryClient = useQueryClient()

  const {
    isLoading: isUpdatingPetition,
    isError: isUpdatePetitionError,
    error: petitionError,
    isSuccess,
    mutateAsync: updatePetition,
  } = useMutation({
    mutationFn: (payload: EditPetition) => {
      const _payload = { ...payload }
      delete _payload?.id
      return apiClient.put(`/petitions/${payload.id}`, { data: _payload })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_CREATED_PETITIONS] })
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_SIGEND_PETITIONS] })
    },
  })

  return {
    isUpdatingPetition,
    isUpdatePetitionError,
    petitionError,
    updatePetition,
    isSuccess,
  }
}
