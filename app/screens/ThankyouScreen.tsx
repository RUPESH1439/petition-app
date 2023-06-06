import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { BackHandler, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { spacing } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

interface ThankyouScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Thankyou">> {}

export const ThankyouScreen: FC<ThankyouScreenProps> = observer(function ThankyouScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.pop()
        navigation.navigate("HomeTab")
        return true
      }

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)

      return () => subscription.remove()
    }, []),
  )

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        presets="backAndTitle"
        tx="thankyouScreen.title"
        onButtonPress={() => {
          navigation.pop()
          navigation.navigate("HomeTab")
        }}
      />
      <View style={$textContainer}>
        <Text preset="primaryBold" tx="thankyouScreen.headingTop" style={$textStyle} />
        <Text preset="primaryBold" tx="thankyouScreen.headingMid" style={$textStyle} />

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
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.medium,
}

const $textStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  textAlign: "center",
  lineHeight: 35,
}

const $bottomTextContainer: ViewStyle = {
  paddingTop: spacing.extraLarge,
}
