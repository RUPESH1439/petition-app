import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { UpdatePetitionStat } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useUpdatePetitionStat() {
  const queryClient = useQueryClient()

  const {
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError,
    mutateAsync: updatePetitionStat,
  } = useMutation({
    mutationFn: (payload: UpdatePetitionStat) => {
      const _payload = { ...payload }
      delete _payload.id
      return apiClient.put(`/petition-stats/${payload.id}`, {
        data: _payload,
      })
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_CREATED_PETITIONS] })
      // queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
      // queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_SIGEND_PETITIONS] })
    },
  })

  return {
    isUpdateError,
    isUpdating,
    updateError,
    updatePetitionStat,
  }
}
