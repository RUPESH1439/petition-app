import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"
import useRTL from "app/hooks/useRTL"
import { moderateVerticalScale } from "app/utils/scaling"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props
  const { isRTL } = useRTL()

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = $presets[props.preset] ? props.preset : "default"
  const $styles = [
    $rtlStyle(isRTL),
    $presets[preset],
    $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  xxl: { fontSize: moderateVerticalScale(34), lineHeight: 44 } as TextStyle,
  xl: { fontSize: moderateVerticalScale(22), lineHeight: 48 } as TextStyle,
  lg: { fontSize: moderateVerticalScale(18), lineHeight: 32 } as TextStyle,
  md: { fontSize: moderateVerticalScale(16), lineHeight: 26 } as TextStyle,
  sm: { fontSize: moderateVerticalScale(14), lineHeight: 24 } as TextStyle,
  xs: { fontSize: moderateVerticalScale(12), lineHeight: 21 } as TextStyle,
  xxs: { fontSize: moderateVerticalScale(10), lineHeight: 18 } as TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.regular,
  { color: colors.text },
]

const $presets = {
  default: $baseStyle,

  primaryBold: [
    $baseStyle,
    $sizeStyles.xl,
    $fontWeightStyles.bold,
    { color: colors.palette.primary100 },
  ],

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  error: [
    $baseStyle,
    $sizeStyles.xxs,
    $fontWeightStyles.medium,
    { color: colors.palette.angry500 },
  ],
}

const $rtlStyle = (isRTL: boolean): TextStyle => (isRTL ? { writingDirection: "rtl" } : {})
