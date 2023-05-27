import * as React from "react"
import { Image, Pressable, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Text } from "app/components/Text"
import { formatDate } from "app/utils/formatDate"
import { Chip } from "../Chip"
import { SvgXml } from "react-native-svg"
import Feather from "react-native-vector-icons/Feather"
import icons from "../../../assets/svgs"
import { Analytic } from "./Analytic"
import {
  $avatar,
  $cityText,
  $container,
  $dateText,
  $fourthContainer,
  $organizationName,
  $petitionImage,
  $petitionTitle,
  $secondContainer,
  $thirdContainer,
  $topContainer,
} from "./styles"
import {
  $analyticsContainer,
  $analyticsMetricContainer,
  $analyticsMetricRow,
  $analyticsText,
  $analyticsTitle,
  $columnsContainer,
  $fifthContainer,
  $metric,
  $metricTitle,
  $metricColumn,
  $sixthContainer,
} from "./myPetitionStyles"
import { ViewMoreText } from "../ViewMoreText"
import { moderateVerticalScale } from "app/utils/scaling"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "app/navigators"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import useFormattedGovernorates from "app/hooks/useFormattedGovernorates"
import { Petition } from "app/hooks/api/interface"
import useDeletePetition from "app/hooks/api/useDeletePetition"

const {
  chevronLeft,
  circleCheckSolid,
  eyeSolid,
  users,
  arrowUp,
  penToSquareRegular,
  trashRegular,
} = icons

interface Analytics {
  title: TxKeyPath
  columns: [TxKeyPath, TxKeyPath]
  data: { count: number; titleX?: TxKeyPath; title?: string; id }[]
}
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
  petitionImageUrl?: string
  petition?: Petition
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
    petitionImageUrl,
    petition,
  } = props

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const $styles = [$container, style]

  const [isExanded, setIsExpanded] = React.useState(false)

  const { governorates } = useFormattedGovernorates()
  const { deletePetition } = useDeletePetition()

  const analytics: Analytics[] = React.useMemo(
    () => [
      {
        title: "petition.analyticsSections.age",
        columns: ["petition.analyticsSections.number", "petition.analyticsSections.ageGroup"],
        data: [
          { count: 50000, titleX: "petition.analyticsSections.youngerThan18", id: "youngerThan18" },
          {
            count: 1200,
            titleX: "petition.analyticsSections.eighteenToThirty",
            id: "eighteenToThirty",
          },
          { count: 1200, titleX: "petition.analyticsSections.thirtyToSixty", id: "thirtyToSixty" },
          {
            count: 1200,
            titleX: "petition.analyticsSections.olderThanSixty",
            id: "olderThanSixty",
          },
        ],
      },
      {
        title: "petition.analyticsSections.gender",
        columns: ["petition.analyticsSections.number", "petition.analyticsSections.gender"],
        data: [
          { count: 50000, titleX: "petition.analyticsSections.male", id: "male" },
          { count: 1200, titleX: "petition.analyticsSections.female", id: "female" },
        ],
      },
      {
        title: "petition.analyticsSections.governorate",
        columns: ["petition.analyticsSections.number", "petition.analyticsSections.gender"],
        data: governorates.map(({ label, value }) => ({
          count: 5000,
          title: label,
          id: value,
        })),
      },
    ],
    [governorates],
  )

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
            navigation.navigate("UserPage")
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
          {!!photoUrl && (
            <Image
              source={{
                uri: photoUrl,
              }}
              style={$avatar}
            />
          )}
        </Pressable>
      )}
      {!!petitionImageUrl && (
        <Image
          source={{
            uri: petitionImageUrl,
          }}
          style={$petitionImage}
        />
      )}
      <View style={$thirdContainer}>
        <Text style={$petitionTitle} text={title} />
        <ViewMoreText text={description} />
      </View>

      <View style={$fourthContainer}>
        <Analytic tx="petition.views" value={viewsCount} svgString={eyeSolid} />
        <Analytic tx="petition.signs" value={signsCount} svgString={users} />
      </View>

      <Pressable style={$fifthContainer} onPress={() => setIsExpanded((prev) => !prev)}>
        <Feather
          name={isExanded ? "chevron-up" : "chevron-down"}
          size={40}
          color={colors.palette.secondary600}
        />
        <Text tx="petition.analytics" style={$analyticsText} />
      </Pressable>
      {!!isExanded && (
        <View style={{}}>
          {analytics.map(({ title, columns, data }) => (
            <View key={title} style={$analyticsContainer}>
              <Text tx={title} style={$analyticsTitle} />
              <View style={$columnsContainer}>
                {columns.map((column) => (
                  <Text tx={column} key={column} style={$metricColumn}></Text>
                ))}
              </View>

              <View style={$analyticsMetricContainer}>
                {data.map(({ count, titleX, title, id }) => (
                  <View key={id} style={$analyticsMetricRow}>
                    <Text text={count?.toString()} style={$metric}></Text>
                    <Text tx={titleX} text={title} style={$metricTitle}></Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={$sixthContainer}>
        <Pressable>
          <SvgXml
            xml={arrowUp}
            height={moderateVerticalScale(24)}
            width={moderateVerticalScale(20.75)}
            fill={colors.palette.primary200}
            style={{ left: moderateVerticalScale(4) }}
          />
        </Pressable>
        <Pressable onPress={async () => await deletePetition({ id: petition?.id })}>
          <SvgXml
            xml={trashRegular}
            height={moderateVerticalScale(24)}
            width={moderateVerticalScale(20.75)}
            fill={colors.palette.primary200}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("EditPetition", { petitionData: petition })}>
          <SvgXml
            xml={penToSquareRegular}
            height={moderateVerticalScale(24)}
            width={moderateVerticalScale(20.75)}
            fill={colors.palette.primary200}
          />
        </Pressable>
      </View>
    </View>
  )
})
