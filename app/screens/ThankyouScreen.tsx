import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ThankyouScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Thankyou">> {}

export const ThankyouScreen: FC<ThankyouScreenProps> = observer(function ThankyouScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader presets="backAndTitle" tx="thankyouScreen.title" />
      <View style={$textContainer}>
        <Text preset="primaryBold" tx="thankyouScreen.headingTop" style={$textStyle} />
        <Text
          preset="primaryBold"
          tx="thankyouScreen.headingBottom"
          style={[$textStyle, $bottomTextContainer]}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $textContainer: ViewStyle = {
  backgroundColor: colors.background,
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.medium,
}

const $textStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  textAlign: "center",
  lineHeight: 30,
}

const $bottomTextContainer: ViewStyle = {
  paddingTop: spacing.extraLarge,
}
