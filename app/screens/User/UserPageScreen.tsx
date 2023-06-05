import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Image, Linking, Pressable, View } from "react-native"
import { AppStackParamList } from "app/navigators"
import { PetitionCard, Screen, Text } from "app/components"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { TxKeyPath } from "app/i18n"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from "app/theme"
import {
  $analyticsNumbers,
  $analyticsText,
  $cardContainer,
  $detailContainer,
  $detailTextStyle,
  $flatListContainer,
  $icon,
  $iconsContainer,
  $image,
  $imageContainer,
  $itemsContainer,
  $nameContainer,
  $root,
} from "./style"
import { FlashList } from "@shopify/flash-list"
import { $flashListContainer } from "../AccountScreen/style"
import { SvgXml } from "react-native-svg"
import svgs from "assets/svgs"
import useGetUserFromId from "app/hooks/api/useGetUserFromId"
import useRTL from "app/hooks/useRTL"
import useGetCreatedPetitions from "app/hooks/api/useGetCreatedPetitions"
import formatPetitions from "app/utils/api/formatPetitions"
import useUser from "app/hooks/userUser"
import { $ltr, $rowReverse, $rtl } from "app/common/styles"

const { phone, instagram, facebook } = svgs

export const UserPageScreen: FC = observer(function UserPageScreen() {
  const { isRTL } = useRTL()
  const { user } = useUser()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const route = useRoute<RouteProp<AppStackParamList, "UserPage">>()
  const { userId } = route?.params ?? {}

  const { userData } = useGetUserFromId(userId)
  const { enName, arName } = userData ?? {}
  const { petitionsData } = useGetCreatedPetitions(userId)
  const petitions = React.useMemo(
    () => formatPetitions(petitionsData, isRTL, user?.owner?.id),
    [petitionsData, isRTL, userId],
  )

  const isOrg = userData?.userType === "organization"
  const renderItem = React.useCallback(({ item }) => {
    const {
      city,
      category,
      viewsCount,
      signsCount,
      name,
      isOrg,
      status,
      isPrivileged,
      date,
      photoUrl,
      title,
      description,
      id,
      signers,
      petitionImageUrl,
      creatorId,
    } = item ?? {}

    return (
      <View style={$cardContainer}>
        <PetitionCard
          id={id}
          city={city}
          category={category}
          viewsCount={viewsCount}
          signsCount={signsCount}
          name={name}
          isOrg={isOrg}
          status={status}
          isPrivileged={isPrivileged}
          date={date}
          photoUrl={photoUrl}
          title={title}
          description={description}
          isAnonymous={true}
          signers={signers}
          petitionImageUrl={petitionImageUrl}
          creatorId={creatorId}
        />
      </View>
    )
  }, [])

  const icons: { key: string; icon: string; link: string }[] = [
    { key: "phone", icon: phone, link: `tel:${userData?.phoneNumber}` },
    { key: "instagram", icon: instagram, link: userData?.instagramLink },
    { key: "facebook", icon: facebook, link: userData?.facebookLink },
  ]

  const analytics: { key: string; title: TxKeyPath; count: number }[] = useMemo(() => {
    const _views = petitions?.map((petition) => {
      const __views = petition.petition?.attributes?.petition_stat?.data?.attributes?.views
      return __views ? parseInt(__views) : 0
    })

    return [
      {
        key: "petition",
        title: "userPageScreen.petitions",
        count: petitions?.length ?? 0,
      },
      {
        key: "views",
        title: "userPageScreen.views",
        count: _views?.reduce((val, current) => current + val, 0),
      },
      {
        key: "signs",
        title: "userPageScreen.signs",
        count: userData?.signedPetitions?.length ?? 0,
      },
    ]
  }, [userData, petitions])

  const openLink = (link: string | null) => {
    if (!link) return
    try {
      if (Linking.canOpenURL(link)) {
        Linking.openURL(link)
      }
    } catch (err) {
      console.log("err", err)
    }
  }

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={$flashListContainer}>
        <FlashList
          ListHeaderComponent={() => (
            <View style={[$detailContainer, isRTL ? $rtl : $ltr]}>
              <Pressable
                onPress={() => {
                  navigation.goBack()
                }}
                hitSlop={5}
                style={$icon}
              >
                <FontAwesome5
                  name={isRTL ? "arrow-right" : "arrow-left"}
                  size={24}
                  color={colors.palette.primary100}
                />
              </Pressable>

              <View>
                {isOrg ? (
                  <View style={$imageContainer}>
                    <Image
                      source={{
                        uri: userData?.image?.url,
                      }}
                      style={$image}
                    />
                  </View>
                ) : null}

                <View style={$nameContainer(isRTL)}>
                  {!!userData?.isPrivileged && (
                    <AntDesign name={"checkcircle"} size={24} color={colors.palette.primary100} />
                  )}
                  <Text
                    preset="primaryBold"
                    text={isRTL ? arName : enName}
                    style={$detailTextStyle}
                  />
                </View>
              </View>

              <View style={$itemsContainer}>
                {analytics.map(({ key, title, count }) => (
                  <View key={key}>
                    <Text style={$analyticsNumbers}>{count}</Text>
                    <Text tx={title} style={$analyticsText} />
                  </View>
                ))}
              </View>

              <View
                style={[
                  $itemsContainer,
                  $iconsContainer,
                  isRTL ? $rtl : $ltr,
                  !!isRTL && $rowReverse,
                ]}
              >
                {icons.map(({ key, icon, link }) => (
                  <Pressable key={key} onPress={() => openLink(link)}>
                    <SvgXml xml={icon} height={39} width={39} />
                  </Pressable>
                ))}
              </View>
            </View>
          )}
          contentContainerStyle={$flatListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          estimatedItemSize={200}
          data={petitions}
        />
      </View>
    </Screen>
  )
})
