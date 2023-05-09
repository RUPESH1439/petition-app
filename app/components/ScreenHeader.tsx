import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "app/components/Text"
import { Button } from "./Button"
import useRTL from "app/hooks/useRTL"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export interface ScreenHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  presets?: "back" | "backAndTitle" | "default"

  onButtonPress?: () => void

  tx?: TxKeyPath

  buttonTx?: TxKeyPath
}

/**
 * Describe your component here
 */
export const ScreenHeader = observer(function ScreenHeader(props: ScreenHeaderProps) {
  const { style, presets, onButtonPress, tx, buttonTx } = props
  const $styles = [$container, style]
  const { isRTL } = useRTL()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const renderBackAndTitle = () => {
    return (
      <View style={[$topContainer(isRTL), $noSpaceBetween]}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome5
            name={isRTL ? "arrow-right" : "arrow-left"}
            size={24}
            color={colors.palette.primary100}
          />
        </Pressable>
        <Text tx={tx} preset="primaryBold" style={$title} />
      </View>
    )
  }

  const renderDefault = () => {
    return (
      <View style={$topContainer(isRTL)}>
        <Text tx={tx} preset="primaryBold" style={$title} />
        {!!buttonTx && (
          <Button
            tx={buttonTx}
            preset="outlined"
            onPress={() => onButtonPress?.()}
            style={$button}
            textStyle={$buttonText}
          />
        )}
      </View>
    )
  }

  const renderContent = () => {
    switch (presets) {
      case "backAndTitle":
        return renderBackAndTitle()
      default:
        return renderDefault()
    }
  }

  return <View style={$styles}>{renderContent()}</View>
})

const $container: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: 0,
}

const $topContainer = (isRTL: boolean): ViewStyle => ({
  direction: isRTL ? "rtl" : "ltr",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottomColor: "#00000029",
  backgroundColor: colors.palette.neutral200,
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.small,
  elevation: 2,
  shadowColor: "#00000029",
  borderBottomWidth: 2,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
})

const $noSpaceBetween: ViewStyle = {
  justifyContent: "flex-start",
  paddingHorizontal: spacing.medium,
  gap: spacing.medium,
}

const $title: TextStyle = {
  fontSize: 20,
}

const $button: ViewStyle = {
  paddingHorizontal: spacing.medium,
  minHeight: 0,
  paddingVertical: 2,
}

const $buttonText: TextStyle = { fontSize: 14 }
