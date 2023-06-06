import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MyPetitionsScreen, UserPageScreen } from "app/screens"

export type MyPetitionStackNavigatorParamList = {
  MyPetitions: undefined
  UserPage: {
    userId: number
  }
}

const Stack = createNativeStackNavigator<MyPetitionStackNavigatorParamList>()
export const MyPetitionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="MyPetitions" component={MyPetitionsScreen} />
      <Stack.Screen name="UserPage" component={UserPageScreen} />
    </Stack.Navigator>
  )
}
