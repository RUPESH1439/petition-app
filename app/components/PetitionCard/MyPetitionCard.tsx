import * as React from "react"
import { Image, Pressable, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Text } from "app/components/Text"
import { formatDate } from "app/utils/formatDate"
import { Chip } from "../Chip"
import { SvgXml } from "react-native-svg"
import icons from "../../../assets/svgs"
import { Analytic } from "./Analytic"
import {
  $avatar,
  $cityText,
  $container,
  $dateText,
  $fourthContainer,
  $organizationName,
  $petitionTitle,
  $secondContainer,
  $thirdContainer,
  $topContainer,
  $fifthContainer,
} from "./styles"
import { ViewMoreText } from "../ViewMoreText"

const { chevronLeft, circleCheckSolid, eyeSolid, users } = icons
export interface MyPetitionCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  date: Date
  category: string
  city: string
  name: string
  photoUrl?: string
  title: string
  description: string
  viewsCount: number
  signsCount: number
  status: "unsigned" | "signed" | "forGuest"
  isOrg: boolean
  isPrivileged: boolean
  isAnonymous?: boolean
}

/**
 * Describe your component here
 */
export const MyPetitionCard = observer(function MyPetitionCard(props: MyPetitionCardProps) {
  const {
    style,
    date,
    category,
    city,
    isOrg,
    name,
    photoUrl,
    title,
    description,
    viewsCount,
    signsCount,
    status: _status,
    isPrivileged,
    isAnonymous,
  } = props

  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$topContainer}>
        <Text text={formatDate(date.toISOString(), "dd/MM/yyyy")} style={$dateText} />
        <Chip text={category} />
        <Text text={city} style={$cityText} />
      </View>
      {!isAnonymous && (
        <Pressable
          style={$secondContainer}
          onPress={() => {
            console.log("test")
          }}
        >
          <SvgXml xml={chevronLeft} height={16} width={16} fill={colors.palette.primary200} />
          {!!isOrg && !!isPrivileged && (
            <SvgXml
              xml={circleCheckSolid}
              height={16}
              width={16}
              fill={colors.palette.primary200}
            />
          )}
          <Text style={$organizationName} text={name} />
          {!!photoUrl && !!isOrg && (
            <Image
              // TODO Remove this hardcode later
              source={{
                uri: photoUrl,
              }}
              style={$avatar}
            />
          )}
        </Pressable>
      )}
      <View style={$thirdContainer}>
        <Text style={$petitionTitle} text={title} />
        <ViewMoreText text={description} />
      </View>

      <View style={$fourthContainer}>
        <Analytic tx="petition.views" value={viewsCount} svgString={eyeSolid} />
        <Analytic tx="petition.signs" value={signsCount} svgString={users} />
      </View>

      <View style={$fifthContainer}></View>
    </View>
  )
})
