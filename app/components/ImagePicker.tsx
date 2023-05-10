import * as React from "react"
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { TxKeyPath } from "app/i18n"
import { EvilIcons } from "react-native-vector-icons"

export interface ImagePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  titleX?: TxKeyPath
}

/**
 * Describe your component here
 */
export const ImagePicker = observer(function ImagePicker(props: ImagePickerProps) {
  const { style, titleX } = props
  const $styles = [$container, style]

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Pressable style={$styles} onPress={() => {}}>
      <EvilIcons name="plus" size={30} />
      <Text style={$text} tx={titleX} />
    </Pressable>
  )
})

const $container: ViewStyle = {
  width: 130,
  maxHeight: 130,
  flex: 1,
  borderWidth: 1,
  borderColor: colors.palette.neutral100,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 17,
  color: colors.palette.neutral100,
}
