import React from "react"
import * as Location from "expo-location"

export default function useLocation() {
  const [location, setLocation] = React.useState(null)
  React.useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        return
      }

      const _location = await Location.getCurrentPositionAsync({})
      setLocation(_location)
    })()
  }, [])
  return { location }
}
