import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { moderateVerticalScale } from "app/utils/scaling"
import useRTL from "app/hooks/useRTL"
import { $ltr, $rtl } from "app/common/styles"

const Circle = ({ selected }: { selected: boolean }) => {
  if (!selected) {
    return <View style={$circle}></View>
  }
  return (
    <View style={$selectedContainer}>
      <View style={$bigCircle}></View>
      <View style={$selectedCircle}></View>
    </View>
  )
}

export interface ShowHideNameProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  onChange?: (showName: boolean) => void
}

/**
 * Describe your component here
 */
export const ShowHideName = observer(function ShowHideName(props: ShowHideNameProps) {
  const { style, onChange } = props
  const { isRTL } = useRTL()

  const $styles = [$container, isRTL ? $rtl : $ltr, style]
  const [showName, setShowName] = React.useState(false)
  return (
    <View style={$styles}>
      <Pressable
        style={[$input, showName && $inputSelected]}
        onPress={() => {
          setShowName(true)
          onChange?.(true)
        }}
      >
        <Circle selected={showName} />
        <Text tx="createPetition.showName" style={[$text, showName && $textSelected]}></Text>
      </Pressable>
      <Pressable
        style={[$input, !showName && $inputSelected]}
        onPress={() => {
          setShowName(false)
          onChange?.(false)
        }}
      >
        <Circle selected={!showName} />
        <Text tx="createPetition.hideName" style={[$text, !showName && $textSelected]}></Text>
      </Pressable>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  gap: moderateVerticalScale(28),
}

const $input: ViewStyle = {
  borderWidth: 1,
  flex: 1,
  borderColor: colors.palette.neutral100,
  borderRadius: moderateVerticalScale(30),
  paddingHorizontal: moderateVerticalScale(14),
  paddingVertical: moderateVerticalScale(12),
  flexDirection: "row",
  alignItems: "center",
  gap: moderateVerticalScale(8),
  backgroundColor: colors.palette.neutral50,
}

const $inputSelected: ViewStyle = {
  backgroundColor: colors.palette.primary200,
  borderWidth: 0,
}

const $circle: ViewStyle = {
  // position: "absolute",
  height: moderateVerticalScale(22),
  width: moderateVerticalScale(22),
  borderRadius: 18,
  borderWidth: 2,
  borderColor: colors.palette.neutral100,
  backgroundColor: colors.palette.neutral50,
  // top: 5,
  // left: 5.1,
}

const $selectedCircle: ViewStyle = {
  position: "absolute",
  height: moderateVerticalScale(19),
  width: moderateVerticalScale(19),
  borderRadius: 18,
  borderWidth: moderateVerticalScale(3),
  borderColor: colors.palette.neutral100,
  backgroundColor: colors.palette.neutral50,
  top: 4.2,
  left: 4,
}

const $bigCircle: ViewStyle = {
  height: moderateVerticalScale(26),
  width: moderateVerticalScale(26),
  borderRadius: 18,
  borderWidth: 2,
  borderColor: colors.palette.neutral100,
  backgroundColor: colors.palette.neutral50,
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(14),
  color: colors.palette.neutral100,
  lineHeight: moderateVerticalScale(24),
}

const $textSelected: TextStyle = {
  color: colors.palette.neutral50,
}

const $selectedContainer: ViewStyle = {
  position: "relative",
}
