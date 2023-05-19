// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral50: "#FFFFFF",
  neutral100: "#707070",
  neutral150: "#737275",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#E5E7EB",
  neutral850: "#292929",
  neutral900: "#000000",
  neutral1000: "#00000000",

  primary100: "#63823B",
  primary200: "#638138",
  primary300: "#5A7830",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#0090B2",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",
  secondary600: "#2E78A6",

  interest100: "#F2A413",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  gray100: "#ABABAB",
  gray150: "#CCCCCC",
  gray200: "#D0D0D0",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral850,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral100,
  /**
   * The default color of the screen background.
   */
  textPrimary: palette.primary100,

  background: palette.neutral50,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
