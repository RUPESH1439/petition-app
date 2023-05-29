import * as React from "react"
import { Image, ImageStyle, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { TxKeyPath } from "app/i18n"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { moderateVerticalScale } from "app/utils/scaling"
import { launchImageLibrary, Asset } from "react-native-image-picker"
import useRTL from "app/hooks/useRTL"
import { $ltr, $rtl } from "app/common/styles"

export interface ImagePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  titleX?: TxKeyPath

  onSelectImage?: (image: Asset & { blob: Blob }) => void

  iconSize?: number

  labelX?: TxKeyPath

  uri?: string
}

/**
 * Describe your component here
 */
export const ImagePicker = observer(function ImagePicker(props: ImagePickerProps) {
  const { style, titleX, onSelectImage, iconSize, labelX, uri } = props
  const $styles = [$container, style]
  const [selectedImage, setSelectedImage] = React.useState<null | (Asset & { blob: Blob })>(null)
  const { isRTL } = useRTL()
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    })
    if (result?.didCancel) {
      return
    }
    const asset = result?.assets?.[0]
    const response = await fetch(asset?.uri)
    const _blob = await response.blob()
    const _image = { ...asset, blob: _blob }
    setSelectedImage(_image)
    onSelectImage?.(_image)
  }
  const renderContainer = () => {
    if (selectedImage || uri) {
      return (
        <Pressable style={$styles} onPress={pickImage}>
          <Image style={$image} source={{ uri: selectedImage?.uri || uri }} />
        </Pressable>
      )
    }

    return (
      <Pressable style={$styles} onPress={pickImage}>
        <EvilIcons name="plus" size={iconSize ?? 30} color={colors.palette.neutral100} />
        {!!titleX && <Text style={$text} tx={titleX} />}
      </Pressable>
    )
  }
  return (
    <View style={[$root, isRTL ? $rtl : $ltr]}>
      {!!labelX && <Text style={[$label, !!selectedImage && $labelSelected]} tx={labelX} />}
      {renderContainer()}
    </View>
  )
})

const $root: ViewStyle = { flex: 1 }

const $container: ViewStyle = {
  width: 130,
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

const $label: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(15),
  color: colors.palette.neutral100,
  marginBottom: moderateVerticalScale(5),
  marginLeft: spacing.medium,
}

const $labelSelected: TextStyle = {
  color: colors.palette.primary200,
}

const $image: ImageStyle = { borderRadius: 30, height: "100%", width: "100%" }
