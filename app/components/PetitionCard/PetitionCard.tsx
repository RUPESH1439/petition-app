import * as React from "react"
import { Image, ImageStyle, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { formatDate } from "app/utils/formatDate"
import { Chip } from "../Chip"
import { moderateVerticalScale } from "app/utils/scaling"
import { SvgXml } from "react-native-svg"
import icons from "../../../assets/svgs"
import { Analytic } from "./Analytic"

const { chevronLeft, chevronRight, circleCheckSolid, eyeSolid, users, arrowUp } = icons
export interface PetitionCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const PetitionCard = observer(function PetitionCard(props: PetitionCardProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$topContainer}>
        <Text text={formatDate(new Date().toISOString(), "dd/MM/yyyy")} style={$dateText} />
        <Chip text="Environment" />
        <Text text="Baghdad" style={$cityText} />
      </View>
      <Pressable style={$secondContainer} onPress={() => {}}>
        <SvgXml xml={chevronLeft} height={16} width={16} fill={colors.palette.primary200} />
        <SvgXml xml={circleCheckSolid} height={16} width={16} fill={colors.palette.primary200} />
        <Text style={$organizationName} text={"growth organization"} />
        <Image
          // TODO Remove this hardcode later
          source={{
            uri: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
          }}
          style={$avatar}
        />
      </Pressable>
      <View style={$thirdContainer}>
        <Text style={$petitionTitle} text={"justice for student"} />
        <Text
          style={$petitionDescription}
          text={"give the students which failed exam another chance to be sure"}
        />
      </View>

      <View style={$fourthContainer} onPress={() => {}}>
        <Analytic tx="petition.views" value={1200} svgString={eyeSolid} />
        <Analytic tx="petition.signs" value={12000} svgString={users} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral50,
  paddingBottom: spacing.medium,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.extraMedium,
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: moderateVerticalScale(15),
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
  borderTopWidth: 0.4,
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

const $thirdContainer: ViewStyle = {
  alignItems: "flex-end",
  paddingVertical: spacing.extraMedium,
  paddingHorizontal: spacing.medium,
  minHeight: moderateVerticalScale(168),
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
}
