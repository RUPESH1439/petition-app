import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, ScreenHeader, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import useLogin from "app/hooks/api/useLogin"
import Snackbar from "react-native-snackbar"
interface SignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SignIn">> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [phone, setPhone] = useState<number | undefined>()
  // Pull in navigation via hook
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { login, userData, loginError, isLogging } = useLogin(phone?.toString())
  if (loginError) {
    Snackbar.show({
      text: loginError?.message,
      backgroundColor: colors.palette.angry500,
      marginBottom: 20,
    })
  }
  useEffect(() => {
    if (userData?.id) {
      navigation.navigate("Otp", {
        phone,
        userData,
      })
    }
  }, [userData?.id])
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        tx="signIn.title"
        buttonTx="signIn.return"
        onButtonPress={() => navigation.goBack()}
      />
      <View style={$container}>
        <TextField
          placeholderTx="signIn.phoneNumber"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(parseInt(text))}
        />
        <Button
          tx="common.continue"
          style={$next}
          loading={isLogging}
          onPress={() => {
            if (phone) {
              login()
            }
          }}
        />
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
