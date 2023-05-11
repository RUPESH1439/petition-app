import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { ImageStyle, TextStyle, ViewStyle } from "react-native/types"

const $root: ViewStyle = {
  flex: 1,
}
const $detailContainer: ViewStyle = {
  gap: 10,
  marginTop: spacing.huge,
}

const $nameContainer = (isRTL: boolean): ViewStyle => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: moderateVerticalScale(10),
  direction: isRTL ? "rtl" : "ltr",
})

const $avatar: ImageStyle = { width: 32, height: 32, borderRadius: 16 }

const $detailTextStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  textAlign: "center",
  lineHeight: 30,
  color: colors.palette.neutral100,
}

const $phoneNumberContainer: ViewStyle = {
  alignItems: "center",
}

const $phoneNumberText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(20),
}

const $linksItemsContainer: ViewStyle = {
  flexDirection: "row",
  gap: moderateVerticalScale(18),
  flexWrap: "wrap",
  paddingTop: spacing.extraLarge,
}

const $linkCard: ViewStyle = {
  flex: 1,
  marginRight: spacing.medium,
}

const $linkCardLastChild: ViewStyle = {
  flex: 1,
  marginRight: spacing.medium * 2,
}

const $accountItems = (isRTL: boolean): ViewStyle => ({
  columnGap: spacing.medium,
  rowGap: spacing.medium,
  paddingLeft: spacing.medium,
  direction: isRTL ? "rtl" : "ltr",
})

export {
  $accountItems,
  $avatar,
  $detailContainer,
  $detailTextStyle,
  $linkCard,
  $linkCardLastChild,
  $linksItemsContainer,
  $nameContainer,
  $phoneNumberContainer,
  $phoneNumberText,
  $root,
}
