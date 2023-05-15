import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { moderateVerticalScale } from "app/utils/scaling"

export interface ChipProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  text: string
}

/**
 * Describe your component here
 */
export const Chip = observer(function Chip(props: ChipProps) {
  const { style, text } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text text={text} style={$text} />
    </View>
  )
})

const $container: ViewStyle = {
  borderColor: colors.palette.neutral100,
  borderWidth: 2,
  borderRadius: moderateVerticalScale(18),
  paddingHorizontal: moderateVerticalScale(10),
  paddingVertical: moderateVerticalScale(5),
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(14),
  color: colors.palette.neutral100,
  lineHeight: moderateVerticalScale(24),
}
