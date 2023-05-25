import { STORAGE } from "app/constants/storage"
import { OrganizationUser, PersonalUser } from "app/hooks/api/interface"
import { remove } from "app/utils/storage"
import React, { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from "react"

type User = PersonalUser | OrganizationUser

type UserContextType = {
  user: User | null
  logout?: () => Promise<void>
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
  const logout = async () => {
    setUser(null)
    await remove(STORAGE.USER)
  }
  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user, setUser],
  )
  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
}
