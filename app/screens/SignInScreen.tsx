import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import useRTL from "app/hooks/useRTL"

interface SignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SignIn">> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { isRTL } = useRTL()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={$topContainer(isRTL)}>
        <Text tx="signIn.title" preset="primaryBold" style={$title} />
        <Button
          tx="signIn.return"
          preset="outlined"
          onPress={() => navigation.navigate("ChooseLanguage")}
          style={$returnButton}
          textStyle={$returnText}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}
const $topContainer = (isRTL: boolean): ViewStyle => ({
  direction: isRTL ? "rtl" : "ltr",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $title: TextStyle = {
  fontSize: 20,
}

const $returnButton: ViewStyle = {
  paddingHorizontal: spacing.medium,
  minHeight: 0,
  paddingVertical: 2,
}

const $returnText: TextStyle = { fontSize: 14 }
