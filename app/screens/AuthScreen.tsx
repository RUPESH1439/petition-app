import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { colors, spacing } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import useLanguagePreference from "app/hooks/useLanguagePreference"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface AuthScreenProps extends AppStackScreenProps<"ChooseLanguage"> {}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <View style={$topContainer}></View>
      <Button
        tx="auth.signIn"
        style={$englishButton}
        onPress={() => navigation.navigate("ChooseLanguage")}
      />
      <Button tx="auth.signUp" style={$englishButton} />
      <Button tx="auth.continueAsGuest" style={$englishButton} preset="secondary" />
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.medium,
  paddingBottom: spacing.large,
}

const $topContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $englishButton: ViewStyle = {
  marginBottom: spacing.medium,
}
