import { useQuery } from "@tanstack/react-query"
import apiClient from "app/services/apiClient"
import { IError, VerifyOtpResponse } from "./interface"
import { API_KEYS } from "app/constants/apiKeys"

export default function useVerifyOtp(phone: string, code: string) {
  const {
    isFetching: isVerifying,
    refetch: verify,
    data: verifiedData,
    error: verifyError,
  } = useQuery({
    queryKey: [API_KEYS.VERIFY_OTP, phone, code],
    queryFn: async () => {
      const response = await apiClient.get(`/verify-otp/${phone}/${code}`).catch((err) => {
        throw Error(err?.response?.data?.error?.message ?? "Something went wrong")
      })

      return response?.data as VerifyOtpResponse
    },
    enabled: false,
  })
  return { isVerifying, verifiedData, verify, verifyError: verifyError as IError }
}
