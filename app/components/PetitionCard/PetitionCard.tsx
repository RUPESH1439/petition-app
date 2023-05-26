import * as React from "react"
import { Image, Pressable, Share, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
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
  $responseButton,
} from "./styles"
import { Button } from "../Button"
import { moderateVerticalScale } from "app/utils/scaling"
import { TxKeyPath } from "app/i18n"
import I18n from "i18n-js"
import { ViewMoreText } from "../ViewMoreText"
import { useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "app/navigators"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import useSignPetition from "app/hooks/api/useSignPetition"
import useCancelSignPetition from "app/hooks/api/useCancelSignPetition"

const { chevronLeft, circleCheckSolid, eyeSolid, users, arrowUp } = icons
export interface PetitionCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  id: number
  date: Date
  category: string
  city: string
  name: string
  photoUrl?: string
  title: string
  description: string
  viewsCount: number | string
  signsCount: number
  status: "unsigned" | "signed" | "forGuest"
  isOrg: boolean
  isPrivileged: boolean
  isAnonymous?: boolean
  signers?: number[]
}

/**
 * Describe your component here
 */
export const PetitionCard = observer(function PetitionCard(props: PetitionCardProps) {
  const {
    id,
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
    signers,
  } = props

  const { signPetition, signSuccess } = useSignPetition()
  const { cancelSignPetition, cancelSuccess } = useCancelSignPetition()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const $styles = [$container, style]

  let timer

  const getButtonProps = (): {
    tx: TxKeyPath
    preset: "default" | "filled" | "secondary" | "interest" | "reversed" | "outlined"
  } => {
    switch (_status) {
      case "signed":
        return {
          tx: "petition.cancel",
          preset: "secondary",
        }
      case "unsigned":
        return {
          tx: "petition.signPetition",
          preset: "default",
        }
      case "forGuest":
        return {
          tx: "petition.signupToParticipate",
          preset: "interest",
        }
      default:
        return {
          tx: "petition.signPetition",
          preset: "default",
        }
    }
  }

  const buttonProps = React.useMemo(() => getButtonProps(), [_status])

  const [signedPetition, setSignedPetition] = React.useState(false)
  const [petitionSigned, setPetitionSigned] = React.useState(false)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: I18n.translate("petition.share.message"),
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log("error", error)
    }
  }

  React.useEffect(() => {
    if (signSuccess) {
      setSignedPetition(true)
      timer = setTimeout(() => {
        setSignedPetition(false)
        setPetitionSigned(true)
      }, 3000)
    }

    return () => {
      if (!timer) return
      clearTimeout(timer)
    }
  }, [signSuccess])

  React.useEffect(() => {
    setPetitionSigned(false)
  }, [cancelSuccess])

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

      <View style={$fifthContainer}>
        <Pressable onPress={onShare}>
          <SvgXml xml={arrowUp} height={26} width={23} fill={colors.palette.primary200} />
        </Pressable>
        <Button
          tx={
            signedPetition
              ? "petition.thankyou"
              : petitionSigned
              ? "petition.cancel"
              : buttonProps.tx
          }
          preset={signedPetition ? "default" : petitionSigned ? "secondary" : buttonProps.preset}
          style={[
            $responseButton,
            _status === "forGuest" ? { paddingHorizontal: spacing.large } : {},
          ]}
          textStyle={{ lineHeight: moderateVerticalScale(21), fontSize: moderateVerticalScale(16) }}
          onPress={async () => {
            if (_status === "forGuest") {
              return
            }
            if (_status === "unsigned" && !signedPetition) {
              await signPetition({ petitionId: id, signers })
            } else {
              await cancelSignPetition({ petitionId: id, signers })
            }
          }}
        />
      </View>
    </View>
  )
})
