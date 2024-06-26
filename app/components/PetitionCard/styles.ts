import { colors, spacing, typography } from "app/theme"
import { moderateScale, moderateVerticalScale } from "app/utils/scaling"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral50,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.extraMedium,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: moderateVerticalScale(14),
  borderTopWidth: 0.4,
  borderBottomWidth: 0.4,
  borderColor: colors.palette.neutral100,
}

const $date: ViewStyle = { position: "absolute", left: spacing.medium }

const $city: ViewStyle = { position: "absolute", right: spacing.medium }

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

const $clickToDelete: ViewStyle = {
  paddingVertical: moderateVerticalScale(8),
  minHeight: moderateVerticalScale(38),
  gap: moderateScale(10),
  paddingHorizontal: moderateScale(16),
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
  $date,
  $city,
  $clickToDelete,
}
