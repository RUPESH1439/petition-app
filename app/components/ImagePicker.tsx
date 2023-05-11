import * as React from "react"
import { Image, ImageStyle, Pressable, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { TxKeyPath } from "app/i18n"
import { EvilIcons } from "react-native-vector-icons"
import { moderateVerticalScale } from "app/utils/scaling"
import { launchImageLibrary, ImagePickerResponse } from "react-native-image-picker"

export interface ImagePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  titleX?: TxKeyPath

  onSelectImage?: (image: ImagePickerResponse) => void
}

/**
 * Describe your component here
 */
export const ImagePicker = observer(function ImagePicker(props: ImagePickerProps) {
  const { style, titleX, onSelectImage } = props
  const $styles = [$container, style]
  const [selectedImage, setSelectedImage] = React.useState<null | ImagePickerResponse>(null)

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
    })
    setSelectedImage(result)
    onSelectImage?.(result)
  }
  if (selectedImage) {
    return (
      <Pressable style={$styles} onPress={pickImage}>
        <Image style={$image} source={{ uri: selectedImage.assets?.[0]?.uri }} />
      </Pressable>
    )
  }
  return (
    <Pressable style={$styles} onPress={pickImage}>
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
  fontSize: moderateVerticalScale(15),
  color: colors.palette.neutral100,
}

const $image: ImageStyle = { height: "100%", width: "100%", borderRadius: 30 }
