import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { colors, spacing } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { moderateVerticalScale } from "app/utils/scaling"

interface AuthScreenProps extends AppStackScreenProps<"ChooseLanguage"> {}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <View style={$topContainer}></View>
      <View style={$next}>
        <Button
          tx="auth.signIn"
          style={$englishButton}
          onPress={() => navigation.navigate("SignIn")}
        />
        <Button
          tx="auth.signUp"
          style={$englishButton}
          onPress={() => navigation.navigate("CreateAccount")}
        />
        <Button
          tx="auth.continueAsGuest"
          preset="secondary"
          onPress={() => navigation.navigate("HomeTab")}
        />
      </View>
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

const $next: ViewStyle = {
  bottom: moderateVerticalScale(0),
}
