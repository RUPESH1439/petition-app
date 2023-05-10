/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef } from "react"
import { AppState, useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import useLanguagePreference from "app/hooks/useLanguagePreference"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  ChooseLanguage: undefined
  Walkthrough1: undefined
  Walkthrough2: undefined
  Walkthrough3: undefined
  Walkthrough4: undefined
  Auth: undefined
  // 🔥 Your screens go here
  SignIn: undefined
  SignUp: undefined
  Thankyou: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
  CreateAccount: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "none" }}
      initialRouteName="ChooseLanguage"
    >
      <Stack.Screen name="ChooseLanguage" component={Screens.ChooseLanguageScreen} />
      <Stack.Screen name="Walkthrough1" component={Screens.WalkthroughScreen1} />
      <Stack.Screen name="Walkthrough2" component={Screens.WalkthroughScreen2} />
      <Stack.Screen name="Walkthrough3" component={Screens.WalkthroughScreen3} />
      <Stack.Screen name="Walkthrough4" component={Screens.WalkthroughScreen4} />
      <Stack.Screen name="Auth" component={Screens.AuthScreen} />
      {/** 🔥 Your screens go here */}
      <Stack.Screen name="SignIn" component={Screens.SignInScreen} />
      <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
      <Stack.Screen name="Thankyou" component={Screens.ThankyouScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
      <Stack.Screen name="CreateAccount" component={Screens.CreateAccountScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  const { getLanguagePreference } = useLanguagePreference()

  const checkPreference = async () => {
    await getLanguagePreference()
  }

  const appState = useRef(AppState.currentState)

  useEffect(() => {
    checkPreference()
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState
      checkPreference()
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
