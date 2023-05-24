import { OrganizationUser, PersonalUser } from "app/hooks/api/interface"
import React, { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from "react"

type User = PersonalUser | OrganizationUser

type UserContextType = {
  user: User | null
  setUser?: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
})

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const providerValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  )
  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
}
