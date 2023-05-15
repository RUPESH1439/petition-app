import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import ViewMore from "react-native-view-more-text"
import { moderateVerticalScale } from "app/utils/scaling"

export interface ViewMoreTextProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  text: string
}

/**
 * Describe your component here
 */
export const ViewMoreText = observer(function ViewMoreText(props: ViewMoreTextProps) {
  const { style, text } = props
  const $styles = [$container, style]

  function renderViewMore(handlePress: () => void) {
    return <Text onPress={handlePress} style={$viewText} tx="common.viewMore" />
  }
  function renderViewLess(handlePress: () => void) {
    return <Text onPress={handlePress} style={$viewText} tx="common.viewLess" />
  }

  return (
    <ViewMore
      numberOfLines={2}
      renderViewMore={renderViewMore}
      renderViewLess={renderViewLess}
      style={$styles}
    >
      <Text style={$text} text={text} />
    </ViewMore>
  )
})

const $container: ViewStyle = {}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  color: colors.palette.neutral150,
  lineHeight: moderateVerticalScale(24),
  fontSize: moderateVerticalScale(14),
  textAlign: "right",
  marginTop: moderateVerticalScale(8),
}

const $viewText: TextStyle = {
  color: colors.palette.primary200,
  fontSize: moderateVerticalScale(10),
  fontFamily: typography.primary.bold,
  textAlign: "right",
  textDecorationLine: "underline",
}
