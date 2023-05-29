import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { UploadMedia } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useUploadMedia() {
  const queryClient = useQueryClient()

  const {
    isLoading: isUploadingMedia,
    isError: isUploadError,
    error: uploadError,
    isSuccess,
    mutateAsync: uploadMedia,
  } = useMutation({
    mutationFn: (payload: UploadMedia) => {
      const formData = new FormData()
      formData.append("files", {
        uri: payload.uri,
        type: payload.type,
        name: payload.name,
      })
      formData.append("refId", "")
      return apiClient.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer 8910053e18cd2837aa4f27d2740f1b26850689c31d06a835061245858b7902443140c76ea9088b224e4137c977f4269c04aeb711e425a336b3c31c42cfeef969ddd1ebb66f8a3f566edd698f1956695e00c356628e3e8253e342c8ff395603a5f3f2151db2257b9106adaa9065458d35d8b386efa1c05f53865b61e557179603",
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
    },
  })

  return {
    isUploadingMedia,
    isUploadError,
    uploadError,
    uploadMedia,
    isSuccess,
  }
}
