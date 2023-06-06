import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen, UserPageScreen } from "app/screens"

export type HomeStackNavigatorParamList = {
  HomeScreen: undefined
  UserPage: {
    userId: number
  }
}

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>()
export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UserPage" component={UserPageScreen} />
    </Stack.Navigator>
  )
}
