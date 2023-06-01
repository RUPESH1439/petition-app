import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { IError } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useResendOtp(phone: string) {
  const {
    isFetching: isResending,
    refetch: resend,
    data: resendData,
    error: resendError,
  } = useQuery({
    queryKey: [API_KEYS.VERIFY_OTP, phone],
    queryFn: async () => {
      const response = await apiClient.get(`/resend-otp/${phone}`).catch((err) => {
        throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
      })

      return response?.data
    },
    enabled: false,
  })
  return { isResending, resend, resendData, resendError: resendError as IError }
}
