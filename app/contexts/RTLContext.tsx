import React, { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from "react"

type RTLContextType = {
  isRTL: boolean
  toggleRTL: () => void
  setIsRTL?: Dispatch<SetStateAction<boolean>>
}

export const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleRTL: () => {},
})

type RTLContextProviderProps = {
  children: ReactNode
}

export const RTLContextProvider = ({ children }: RTLContextProviderProps) => {
  const [isRTL, setIsRTL] = useState(false)
  const providerValue = useMemo(
    () => ({
      isRTL,
      toggleRTL: () => setIsRTL((prev) => !prev),
      setIsRTL,
    }),
    [isRTL, setIsRTL],
  )
  return <RTLContext.Provider value={providerValue}>{children}</RTLContext.Provider>
}
