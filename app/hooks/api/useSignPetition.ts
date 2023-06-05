import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { SignPetitionPayload } from "./interface"
import useUser from "../userUser"
import { API_KEYS } from "app/constants/apiKeys"

export default function useSignPetition() {
  const { user } = useUser()
  const userId = user?.owner?.id
  const queryClient = useQueryClient()
  const {
    isLoading: isSigningPetition,
    isError: isSigningError,
    error: signingError,
    mutateAsync: signPetition,
    isSuccess: signSuccess,
  } = useMutation({
    mutationFn: (payload: SignPetitionPayload) => {
      return apiClient.put(`petitions/${payload.petitionId}`, {
        data: {
          signers: [...payload.signers, userId],
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_KEYS.GET_PETITIONS],
      })
      queryClient.invalidateQueries({
        queryKey: [API_KEYS.GET_SIGEND_PETITIONS],
      })
      queryClient.invalidateQueries({
        queryKey: [API_KEYS.GET_CREATED_PETITIONS],
      })
      queryClient.invalidateQueries({
        queryKey: [API_KEYS.GET_PETITION],
      })
    },
  })

  return {
    isSigningPetition,
    isSigningError,
    signingError,
    signPetition,
    signSuccess,
  }
}
