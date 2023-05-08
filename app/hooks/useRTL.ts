import { RTLContext } from "app/contexts/RTLContext"
import { useContext } from "react"

export default function useRTL() {
  const { isRTL, toggleRTL, setIsRTL } = useContext(RTLContext)
  return { isRTL, toggleRTL, setIsRTL }
}
