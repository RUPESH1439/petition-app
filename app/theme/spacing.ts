import { moderateVerticalScale } from "app/utils/scaling"

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  micro: moderateVerticalScale(1),
  tiny: moderateVerticalScale(2),
  extraSmall: moderateVerticalScale(6),
  small: moderateVerticalScale(10),
  lowMedium: moderateVerticalScale(12),
  medium: moderateVerticalScale(14),
  extraMedium: moderateVerticalScale(18),
  large: moderateVerticalScale(22),
  extraLarge: moderateVerticalScale(30),
  huge: moderateVerticalScale(46),
  massive: moderateVerticalScale(62),
} as const

export type Spacing = keyof typeof spacing
