import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import Entypo from "react-native-vector-icons/Entypo"
import useRTL from "app/hooks/useRTL"
import { moderateVerticalScale } from "app/utils/scaling"
import { TxKeyPath } from "app/i18n"

type Preset = "default" | "secondary"

export interface LinkCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  tx?: TxKeyPath
  onPress: () => void
  preset?: Preset
}

/**
 * Describe your component here
 */
export const LinkCard = observer(function LinkCard(props: LinkCardProps) {
  const { tx, onPress, style, preset } = props
  const { isRTL } = useRTL()

  return (
    <Pressable style={[$container(preset), style]} onPress={onPress}>
      <View style={$itemContainer}>
        <Text tx={tx} preset="primaryBold" style={$linkText} />
        <Entypo
          name={isRTL ? "chevron-left" : "chevron-right"}
          size={24}
          color={colors.palette.neutral50}
        />
      </View>
    </Pressable>
  )
})

const $container = (variant: Preset): ViewStyle => ({
  height: moderateVerticalScale(98),
  backgroundColor:
    variant === "secondary" ? colors.palette.secondary600 : colors.palette.primary100,
  borderRadius: 12,
  justifyContent: "flex-end",
  paddingBottom: spacing.small,
  paddingHorizontal: spacing.small,
})

const $itemContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "flex-end",
}

const $linkText: TextStyle = {
  fontSize: moderateVerticalScale(14),
  fontFamily: typography.primary.extraBold,
  color: colors.palette.neutral50,
  lineHeight: moderateVerticalScale(26),
}
