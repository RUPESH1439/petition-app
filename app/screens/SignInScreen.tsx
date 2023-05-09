import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, ScreenHeader, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { spacing } from "app/theme"

interface SignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SignIn">> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        tx="signIn.title"
        buttonTx="signIn.return"
        onButtonPress={() => navigation.goBack()}
      />
      <View style={$container}>
        <TextField placeholderTx="signIn.phoneNumber" keyboardType="phone-pad" />
        <Button tx="common.next" style={$next} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraLarge,
}

const $next: ViewStyle = {
  marginTop: spacing.extraLarge,
}
