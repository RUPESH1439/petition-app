import { colors, spacing, typography } from "app/theme"
import { moderateScale, moderateVerticalScale } from "app/utils/scaling"
import { ImageStyle } from "react-native"
import { TextStyle, ViewStyle } from "react-native/types"

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#CCCCCC",
}

const $detailContainer: ViewStyle = {
  backgroundColor: "#fff",
}

const $cardContainer: ViewStyle = {
  backgroundColor: "#fff",
  marginTop: moderateVerticalScale(5),
}

const $icon: ViewStyle = {
  marginLeft: moderateScale(18),
  top: moderateVerticalScale(32),
  width: moderateVerticalScale(30),
  zIndex: 999,
}

const $imageContainer: ViewStyle = {
  alignItems: "center",
  paddingBottom: spacing.medium,
}

const $image: ImageStyle = {
  height: 110,
  width: 110,
  borderRadius: 55,
}

const $itemsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: moderateVerticalScale(46),
  marginTop: moderateVerticalScale(40),
}

const $analyticsNumbers: TextStyle = {
  lineHeight: moderateVerticalScale(34),
  fontSize: moderateVerticalScale(20),
  color: colors.palette.neutral100,
  alignSelf: "center",
  fontFamily: typography.primary.medium,
}

const $analyticsText: TextStyle = {
  fontFamily: typography.primary.bold,
  lineHeight: moderateVerticalScale(24),
  fontSize: moderateVerticalScale(14),
  color: colors.palette.neutral100,
  alignSelf: "center",
}

const $detailTextStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  textAlign: "center",
  lineHeight: 30,
  color: colors.palette.neutral100,
}

const $nameContainer = (isRTL: boolean): ViewStyle => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: moderateVerticalScale(10),
  direction: isRTL ? "rtl" : "ltr",
  marginTop: 10,
})

const $iconsContainer: ViewStyle = {
  paddingBottom: spacing.extraMedium,
}

// List Styles
const $container: ViewStyle = {
  backgroundColor: colors.palette.neutral800,
  height: "100%",
  width: "100%",
}

const $listCardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $flatListContainer: ViewStyle = { paddingBottom: spacing.extraLarge }

export {
  $root,
  $cardContainer,
  $detailContainer,
  $analyticsNumbers,
  $analyticsText,
  $detailTextStyle,
  $icon,
  $iconsContainer,
  $image,
  $imageContainer,
  $itemsContainer,
  $nameContainer,
  $container,
  $listCardContainer,
  $flatListContainer,
}