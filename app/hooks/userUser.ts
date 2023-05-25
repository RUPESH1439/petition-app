import { UserContext } from "app/contexts/UserContext"
import { useContext } from "react"

export default function useUser() {
  const { user, setUser, logout } = useContext(UserContext)
  return { user, setUser, logout }
}
