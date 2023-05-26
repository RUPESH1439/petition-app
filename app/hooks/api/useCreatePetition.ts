import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { CreatePetition } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useCreatePetition() {
  const queryClient = useQueryClient()

  const {
    isLoading: isCreatingPetition,
    isError: isCreatePetitionError,
    error: petitionError,
    isSuccess,
    mutateAsync: createPetition,
  } = useMutation({
    mutationFn: (payload: CreatePetition) => {
      return apiClient.post(`/create-petition`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
    },
  })

  return {
    isCreatingPetition,
    isCreatePetitionError,
    petitionError,
    createPetition,
    isSuccess,
  }
}
