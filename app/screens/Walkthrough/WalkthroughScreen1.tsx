import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { colors, spacing, typography } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface WalkthroughScreen1Props extends AppStackScreenProps<"ChooseLanguage"> {}

export const WalkthroughScreen1: FC<WalkthroughScreen1Props> = observer(
  function WalkthroughScreen1() {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    return (
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$topContainer}>
          <Text tx="walkthrough.screen1.text" style={$textStyle} />
        </View>

        <Button
          tx="common.next"
          onPress={() => {
            navigation.navigate("Walkthrough2")
          }}
        />
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
  paddingTop: spacing.large,
}

const $topContainer: ViewStyle = {
  flex: 1,
}

const $textStyle: TextStyle = {
  fontFamily: typography.primary.semibold,
  fontSize: 16,
}
