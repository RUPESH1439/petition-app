import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { colors, spacing } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import useLanguagePreference from "app/hooks/useLanguagePreference"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface ChooseLanguageScreenProps extends AppStackScreenProps<"ChooseLanguage"> {}

export const ChooseLanguageScreen: FC<ChooseLanguageScreenProps> = observer(
  function ChooseLanguageScreen() {
    const { setLanguagePreference } = useLanguagePreference()
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    const handleLanguagePreference = async (language: "ar" | "en") => {
      await setLanguagePreference(language)
      navigation.navigate("Walkthrough1")
    }
    return (
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$topContainer}>
          <Text text="إختر لغتك" preset="primaryBold" />
          <Text text="Choose your language" preset="primaryBold" />
        </View>
        <Button
          text="English"
          style={$englishButton}
          onPress={() => handleLanguagePreference("en")}
        />
        <Button text="عربي" onPress={() => handleLanguagePreference("ar")} />
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.medium,
  paddingBottom: spacing.large,
}

const $topContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $englishButton: ViewStyle = {
  marginBottom: spacing.medium,
}
