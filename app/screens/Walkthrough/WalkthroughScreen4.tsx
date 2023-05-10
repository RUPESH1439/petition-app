import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { colors, spacing, typography } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface WalkthroughScreen4Props extends AppStackScreenProps<"ChooseLanguage"> {}

export const WalkthroughScreen4: FC<WalkthroughScreen4Props> = observer(
  function WalkthroughScreen4() {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    return (
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$topContainer}>
          <Text tx="walkthrough.screen4.first" style={$textStyle} />
          <Text tx="walkthrough.screen4.second" style={$textStyle} />
          <Text tx="walkthrough.screen4.third" style={$textStyle} />
        </View>

        <Button
          tx="common.next"
          onPress={() => {
            navigation.navigate("Auth")
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
  fontSize: 16,
  lineHeight: 40,
  marginBottom: "10%",
}
