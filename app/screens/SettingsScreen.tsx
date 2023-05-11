import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Dropdown, Screen, ScreenHeader } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import useLanguagePreference from "app/hooks/useLanguagePreference"
import { spacing } from "app/theme"

interface SettingsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Settings">> {}
type Language = "ar" | "en"
export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { setLanguagePreference } = useLanguagePreference()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const _languages = [
    { value: "en", label: "English" },
    { value: "ar", label: "عربي" },
  ]
  const [languages, setLanguages] = React.useState(_languages)
  const handleLanguagePreference = async (language: "ar" | "en") => {
    await setLanguagePreference(language)
  }

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        tx="settings.title"
        presets="backAndTitle"
        onButtonPress={() => navigation.goBack()}
      />
      <View style={$container}>
        <Dropdown
          items={languages}
          setItems={setLanguages}
          placeholderTx={"settings.placeholder"}
          onChange={(value) => {
            handleLanguagePreference(value as Language)
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
