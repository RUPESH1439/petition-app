import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { TextStyle, ViewStyle } from "react-native"

const $analyticsText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(16),
  color: colors.palette.secondary600,
  lineHeight: moderateVerticalScale(27),
}

const $fifthContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: moderateVerticalScale(10),
  justifyContent: "space-between",
  paddingHorizontal: spacing.medium,
  borderBottomWidth: 0.4,
  borderColor: colors.palette.neutral100,
}

const $sixthContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: moderateVerticalScale(13),
  paddingHorizontal: spacing.medium,
}

const $analyticsContainer: ViewStyle = {
  paddingVertical: moderateVerticalScale(13),
  paddingHorizontal: spacing.medium,
  minHeight: moderateVerticalScale(168),
  borderBottomWidth: 0.4,
  borderColor: colors.palette.neutral100,
}

const $analyticsTitle: TextStyle = {
  textAlign: "right",
  color: colors.palette.secondary600,
  fontSize: moderateVerticalScale(16),
  fontFamily: typography.primary.bold,
  marginBottom: moderateVerticalScale(27.5),
  lineHeight: moderateVerticalScale(27),
}

const $columnsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: moderateVerticalScale(18),
}

const $analyticsMetricContainer: ViewStyle = {
  gap: moderateVerticalScale(18),
}

const $analyticsMetricRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $metricColumn: TextStyle = {
  color: colors.palette.interest100,
  fontSize: moderateVerticalScale(16),
  fontFamily: typography.primary.bold,
  lineHeight: moderateVerticalScale(27),
}

const $metric: TextStyle = {
  fontSize: moderateVerticalScale(18),
  fontFamily: typography.primary.bold,
  lineHeight: moderateVerticalScale(27),
  color: colors.palette.neutral100,
}

const $metricTitle: TextStyle = {
  fontSize: moderateVerticalScale(14),
  fontFamily: typography.primary.bold,
  lineHeight: moderateVerticalScale(27),
  color: colors.palette.neutral100,
}

export {
  $analyticsContainer,
  $analyticsMetricContainer,
  $analyticsMetricRow,
  $analyticsText,
  $analyticsTitle,
  $columnsContainer,
  $fifthContainer,
  $metric,
  $sixthContainer,
  $metricColumn,
  $metricTitle,
}
