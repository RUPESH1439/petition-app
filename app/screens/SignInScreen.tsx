import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, ScreenHeader, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import useLogin from "app/hooks/api/useLogin"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import I18n from "i18n-js"

interface SignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SignIn">> {}

const schema = z.object({
  mobileNumber: z.string().length(11),
})

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      mobileNumber: null,
    },
  })
  const phone = watch("mobileNumber")
  const { login, userData, loginError, isLogging } = useLogin(phone)
  const [canNavigate, setCanNavigate] = useState(false)

  const onSubmit = async (_data) => {
    login()
    setCanNavigate(true)
  }

  useEffect(() => {
    if (userData?.id && canNavigate) {
      navigation.navigate("Otp", {
        phone,
        userData,
      })
    }
  }, [userData?.id, isLogging])
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        tx="signIn.title"
        buttonTx="signIn.return"
        onButtonPress={() => navigation.goBack()}
      />
      <View style={$container}>
        <TextField
          control={control}
          name="mobileNumber"
          status={errors?.mobileNumber ? "error" : null}
          errorText={
            errors?.mobileNumber ? `${11 - phone?.length} ${I18n.translate("errors.phone")}` : null
          }
          placeholderTx="createPersonalAccount.mobileNumber"
          keyboardType="numeric"
        />
        <Button
          tx="common.continue"
          style={$next}
          loading={isLogging}
          onPress={handleSubmit(onSubmit)}
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
