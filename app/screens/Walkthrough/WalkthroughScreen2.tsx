import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { colors, spacing, typography } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { moderateVerticalScale } from "app/utils/scaling"

interface WalkthroughScreen2Props extends AppStackScreenProps<"ChooseLanguage"> {}

export const WalkthroughScreen2: FC<WalkthroughScreen2Props> = observer(
  function WalkthroughScreen2() {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    return (
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$topContainer}>
          <Text tx="walkthrough.screen2.first" style={$textStyle} />
          <Text tx="walkthrough.screen2.second" style={$textStyle} />
          <Text tx="walkthrough.screen2.third" style={$textStyle} />
          <Text tx="walkthrough.screen2.fourth" style={$textStyle} />
        </View>

        <Button
          tx="common.next"
          style={$next}
          onPress={() => {
            navigation.navigate("Walkthrough3")
          }}
        />
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.medium,
  paddingBottom: spacing.large,
  paddingTop: spacing.large,
}

const $topContainer: ViewStyle = {
  flex: 1,
}

const $textStyle: TextStyle = {
  fontFamily: typography.primary.semibold,
  fontSize: moderateVerticalScale(14),
  lineHeight: 40,
  marginBottom: "10%",
}

const $next: ViewStyle = {
  bottom: moderateVerticalScale(0),
}
