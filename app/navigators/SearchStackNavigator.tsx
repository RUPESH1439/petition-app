import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { UserPageScreen, SearchScreen } from "app/screens"

export type SearchStackNavigatorParamList = {
  SearchScreen: undefined
  UserPage: {
    userId: number
  }
}

const Stack = createNativeStackNavigator<SearchStackNavigatorParamList>()
export const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="UserPage" component={UserPageScreen} />
    </Stack.Navigator>
  )
}
