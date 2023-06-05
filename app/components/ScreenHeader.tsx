import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Button } from "./Button"
import useRTL from "app/hooks/useRTL"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { moderateVerticalScale } from "app/utils/scaling"

export interface ScreenHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  presets?: "back" | "backAndTitle" | "default"

  onButtonPress?: () => void

  tx?: TxKeyPath

  buttonTx?: TxKeyPath

  hideBorder?: boolean

  RightAccessory?: React.ReactNode

  BottomAccessory?: React.ReactNode

  bottomStyle?: StyleProp<ViewStyle>

  isHome?: boolean
}

/**
 * Describe your component here
 */
export const ScreenHeader = observer(function ScreenHeader(props: ScreenHeaderProps) {
  const {
    style,
    presets,
    onButtonPress,
    tx,
    buttonTx,
    hideBorder,
    RightAccessory,
    BottomAccessory,
    bottomStyle,
    isHome,
  } = props
  const $styles = [$container, style]
  const $bottomStyles = [$bottomContainer, bottomStyle]
  const { isRTL } = useRTL()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const renderBackAndTitle = () => {
    return (
      <View style={$topContainer(isRTL)}>
        <View style={$row}>
          <Pressable onPress={() => (onButtonPress ? onButtonPress() : navigation.goBack())}>
            <FontAwesome5
              name={isRTL ? "arrow-right" : "arrow-left"}
              size={24}
              color={colors.palette.primary100}
            />
          </Pressable>
          <Text tx={tx} preset="primaryBold" style={$title} />
        </View>

        {!!RightAccessory && !isHome && <View>{RightAccessory}</View>}
      </View>
    )
  }

  const renderDefault = () => {
    return (
      <View style={[$topContainer(isRTL), !!hideBorder && $hideBorder]}>
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

        {!!RightAccessory && !isHome && <View>{RightAccessory}</View>}
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

  return (
    <View style={$styles}>
      {!!RightAccessory && isHome && (
        <View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              position: "absolute",
              zIndex: 9999,
            },
            // eslint-disable-next-line react-native/no-inline-styles
            !isRTL ? { right: spacing.medium } : { left: spacing.medium },
          ]}
        >
          {RightAccessory}
        </View>
      )}

      {renderContent()}
      {!!BottomAccessory && <View style={$bottomStyles}>{BottomAccessory}</View>}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: 0,
  paddingTop: spacing.medium,
  borderBottomColor: "#00000029",
  backgroundColor: colors.palette.neutral50,
  paddingBottom: spacing.small,
  elevation: 2,
  shadowColor: "#00000029",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 1.5,
}

const $topContainer = (isRTL: boolean): ViewStyle => ({
  direction: isRTL ? "rtl" : "ltr",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.medium,
})

const $bottomContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $hideBorder = {
  borderBottomWidth: 0,
  shadowRadius: 0,
  shadowOffset: {
    width: 0,
    height: 0,
  },
}

const $title: TextStyle = {
  fontSize: moderateVerticalScale(21),
  fontFamily: typography.primary.extraBold,
}

const $button: ViewStyle = {
  paddingHorizontal: spacing.medium,
  minHeight: 0,
  paddingVertical: 2,
}

const $buttonText: TextStyle = { fontSize: moderateVerticalScale(12) }

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.medium,
}
