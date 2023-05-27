import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral50,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.extraMedium,
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: moderateVerticalScale(8),
  borderTopWidth: 0.4,
  borderBottomWidth: 0.4,
  borderColor: colors.palette.neutral100,
}

const $cityText: TextStyle = {
  fontFamily: typography.primary.bold,
  color: colors.palette.neutral150,
  lineHeight: moderateVerticalScale(24),
  fontSize: moderateVerticalScale(14),
}

const $dateText: TextStyle = {
  fontFamily: typography.primary.bold,
  color: colors.palette.neutral150,
  lineHeight: moderateVerticalScale(24),
  fontSize: moderateVerticalScale(14),
}

const $secondContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingVertical: moderateVerticalScale(12),
  borderBottomWidth: 0.4,
  borderColor: colors.palette.neutral100,
  justifyContent: "flex-end",
  paddingHorizontal: spacing.medium,
}

const $organizationName: TextStyle = {
  fontFamily: typography.primary.bold,
  color: colors.palette.neutral150,
  lineHeight: moderateVerticalScale(24),
  fontSize: moderateVerticalScale(14),
}

const $avatar: ImageStyle = {
  width: moderateVerticalScale(30),
  height: moderateVerticalScale(30),
  borderRadius: moderateVerticalScale(15),
}

const $petitionImage: ImageStyle = {
  marginHorizontal: spacing.medium,
  height: moderateVerticalScale(300),
  marginTop: moderateVerticalScale(18),
  borderRadius: moderateVerticalScale(15),
}

const $thirdContainer: ViewStyle = {
  alignItems: "flex-end",
  paddingVertical: spacing.extraMedium,
  paddingHorizontal: spacing.medium,
}

const $petitionTitle: TextStyle = {
  color: colors.palette.secondary600,
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(18),
  lineHeight: moderateVerticalScale(31),
}

const $petitionDescription: TextStyle = {
  fontFamily: typography.primary.bold,
  color: colors.palette.neutral150,
  lineHeight: moderateVerticalScale(24),
  fontSize: moderateVerticalScale(14),
  textAlign: "right",
  marginTop: moderateVerticalScale(8),
}

const $fourthContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingVertical: moderateVerticalScale(12),
  borderTopWidth: 0.4,
  borderBottomWidth: 0.4,
  borderColor: colors.palette.neutral100,
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
  paddingLeft: spacing.large,
}

const $fifthContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingVertical: moderateVerticalScale(10),
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
}

const $responseButton: ViewStyle = {
  paddingHorizontal: moderateVerticalScale(39),
  minHeight: 0,
  height: moderateVerticalScale(38),
}

export {
  $fourthContainer,
  $avatar,
  $cityText,
  $container,
  $dateText,
  $organizationName,
  $petitionDescription,
  $petitionTitle,
  $secondContainer,
  $thirdContainer,
  $topContainer,
  $fifthContainer,
  $responseButton,
  $petitionImage,
}
