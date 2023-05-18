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
import useRTL from "app/hooks/useRTL"
import { useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "app/navigators"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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
  data: { count: number; titleX?: TxKeyPath; title?: string }[]
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

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const $styles = [$container, style]

  const { isRTL } = useRTL()

  const [isExanded, setIsExpanded] = React.useState(false)

  const mockCities = [
    {
      id: "iraq",
      enName: "Iraq",
      arName: "بغداد",
    },
    {
      id: "bagdad",
      enName: "Baghdad",
      arName: "بغداد",
    },
    {
      id: "najaf",
      enName: "Najaf",
      arName: "بغداد",
    },
  ]

  const analytics: Analytics[] = React.useMemo(
    () => [
      {
        title: "petition.analyticsSections.age",
        columns: ["petition.analyticsSections.number", "petition.analyticsSections.ageGroup"],
        data: [
          { count: 50000, titleX: "petition.analyticsSections.youngerThan18" },
          { count: 1200, titleX: "petition.analyticsSections.eighteenToThirty" },
          { count: 1200, titleX: "petition.analyticsSections.thirtyToSixty" },
          { count: 1200, titleX: "petition.analyticsSections.olderThanSixty" },
        ],
      },
      {
        title: "petition.analyticsSections.gender",
        columns: ["petition.analyticsSections.number", "petition.analyticsSections.gender"],
        data: [
          { count: 50000, titleX: "petition.analyticsSections.male" },
          { count: 1200, titleX: "petition.analyticsSections.female" },
        ],
      },
      {
        title: "petition.analyticsSections.governorate",
        columns: ["petition.analyticsSections.number", "petition.analyticsSections.gender"],
        data: mockCities.map(({ enName, arName }) => ({
          count: 5000,
          title: isRTL ? arName : enName,
        })),
      },
    ],
    [mockCities],
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
                {data.map(({ count, titleX, title }) => (
                  <View key={title} style={$analyticsMetricRow}>
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
        <Pressable>
          <SvgXml
            xml={trashRegular}
            height={moderateVerticalScale(24)}
            width={moderateVerticalScale(20.75)}
            fill={colors.palette.primary200}
          />
        </Pressable>
        <Pressable>
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
