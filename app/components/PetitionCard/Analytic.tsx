import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { TxKeyPath } from "app/i18n"
import { SvgXml } from "react-native-svg"
import { moderateVerticalScale } from "app/utils/scaling"

export interface AnalyticProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  tx: TxKeyPath
  value: number
  svgString: string
}

/**
 * Describe your component here
 */
export const Analytic = observer(function Analytic(props: AnalyticProps) {
  const { style, tx, value, svgString } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$text} tx={tx} />
      <Text style={$analytic}>{value}</Text>
      <SvgXml xml={svgString} height={24} width={31} fill={colors.palette.secondary600} />
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  gap: 7,
  alignItems: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(15),
  color: colors.palette.secondary600,
  lineHeight: moderateVerticalScale(24),
}

const $analytic: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(18),
  color: colors.palette.secondary600,
  lineHeight: moderateVerticalScale(32),
}