import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { API_KEYS } from "app/constants/apiKeys"

export default function useDeletePetition() {
  const queryClient = useQueryClient()

  const {
    isLoading: isDeletingPetition,
    isError: isDeletePetitionError,
    error: petitionError,
    isSuccess,
    mutateAsync: deletePetition,
  } = useMutation({
    mutationFn: (payload: { id: number }) => {
      return apiClient.delete(`/petitions/${payload.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_CREATED_PETITIONS] })
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_SIGEND_PETITIONS] })
    },
  })

  return {
    isDeletingPetition,
    isDeletePetitionError,
    petitionError,
    deletePetition,
    isSuccess,
  }
}
