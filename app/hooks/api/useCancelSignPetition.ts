import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { SignPetitionPayload } from "./interface"
import useUser from "../userUser"
import { API_KEYS } from "app/constants/apiKeys"

export default function useCancelSignPetition() {
  const { user } = useUser()
  const userId = user?.owner?.id
  const queryClient = useQueryClient()
  const {
    isLoading: isCancellingSigningPetition,
    isError: isCancelSigningError,
    error: cancelSigningError,
    mutateAsync: cancelSignPetition,
    isSuccess: cancelSuccess,
  } = useMutation({
    mutationFn: (payload: SignPetitionPayload) => {
      return apiClient.put(`petitions/${payload.petitionId}`, {
        data: {
          signers: [...payload.signers?.filter((signer) => signer !== userId)],
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
    },
  })

  return {
    isCancellingSigningPetition,
    isCancelSigningError,
    cancelSigningError,
    cancelSignPetition,
    cancelSuccess,
  }
}
