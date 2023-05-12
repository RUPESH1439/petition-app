import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
// import { useStores } from "app/models"

interface PrivacyPolicyScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"PrivacyPolicy">> {}

export const PrivacyPolicyScreen: FC<PrivacyPolicyScreenProps> = observer(
  function PrivacyPolicyScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="privacyPolicyScreen.title"
          presets="backAndTitle"
          onButtonPress={() => navigation.goBack()}
        />
        <View style={$policyContainer}>
          <Text style={$textStyle} tx="privacyPolicyScreen.policy" />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $policyContainer: ViewStyle = {
  paddingHorizontal: spacing.extraMedium,
  paddingTop: moderateVerticalScale(38),
}

const $textStyle: TextStyle = {
  lineHeight: moderateVerticalScale(31),
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(18),
  color: colors.palette.neutral100,
}
