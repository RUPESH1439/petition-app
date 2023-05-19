import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, Pressable, View } from "react-native"
import { AppStackParamList } from "app/navigators"
import { PetitionCard, Screen, Text } from "app/components"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useNavigation } from "@react-navigation/native"
import { TxKeyPath, isRTL } from "app/i18n"
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

const { phone, instagram, facebook } = svgs

const mockData = [
  {
    city: "Bagdad",
    category: "Environment",
    viewsCount: 12000,
    signsCount: 12000,
    name: "global organization",
    isOrg: true,
    status: "unsigned",
    isPrivileged: true,
    date: new Date(),
    title: "justice for student",
    description:
      "give the students which failed exam another chance to be suregive the students which failed exam another chance to be suregive the students which failed exam another chance to be sure",
    photoUrl: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
  },
  {
    city: "Iraq",
    category: "Environment",
    viewsCount: 12000,
    signsCount: 12000,
    isAnonymous: true,
    name: "global organization",
    isOrg: true,
    status: "signed",
    isPrivileged: true,
    date: new Date(),
    title: "justice for student",
    description: "give the students which failed exam another chance to be sure",
    photoUrl: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
  },
  {
    city: "Iraq",
    category: "Environment",
    viewsCount: 12000,
    signsCount: 12000,
    name: "Muhammad Sali",
    isOrg: false,
    status: "signed",
    isPrivileged: false,
    date: new Date(),
    title: "justice for student",
    description: "give the students which failed exam another chance to be sure",
    photoUrl: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
  },
  {
    city: "Iraq",
    category: "Environment",
    viewsCount: 12000,
    signsCount: 12000,
    name: "global organization",
    isOrg: true,
    status: "signed",
    isPrivileged: false,
    date: new Date(),
    title: "justice for student",
    description: "give the students which failed exam another chance to be sure",
    photoUrl: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
  },
]

export const UserPageScreen: FC = observer(function UserPageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const isOrg = true
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
    } = item ?? {}

    return (
      <View style={$cardContainer}>
        <PetitionCard
          city={city}
          category={category}
          viewsCount={viewsCount}
          signsCount={signsCount}
          name={name}
          isOrg={isOrg}
          status={status as "unsigned" | "signed" | "forGuest"}
          isPrivileged={isPrivileged}
          date={date}
          photoUrl={photoUrl}
          title={title}
          description={description}
          isAnonymous={true}
        />
      </View>
    )
  }, [])

  const icons: { key: string; icon: string }[] = [
    { key: "phone", icon: phone },
    { key: "instagram", icon: instagram },
    { key: "facebook", icon: facebook },
  ]

  const analytics: { key: string; title: TxKeyPath; count: number }[] = [
    {
      key: "petition",
      title: "userPageScreen.petitions",
      count: 1000,
    },
    {
      key: "views",
      title: "userPageScreen.views",
      count: 1000,
    },
    {
      key: "signs",
      title: "userPageScreen.signs",
      count: 1000,
    },
  ]

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={$detailContainer}>
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
                  uri: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
                }}
                style={$image}
              />
            </View>
          ) : null}

          <View style={$nameContainer(isRTL)}>
            <AntDesign name={"checkcircle"} size={24} color={colors.palette.primary100} />
            <Text preset="primaryBold" tx="userPageScreen.accountName" style={$detailTextStyle} />
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

        <View style={[$itemsContainer, $iconsContainer]}>
          {icons.map(({ key, icon }) => (
            <SvgXml key={key} xml={icon} height={39} width={39} />
          ))}
        </View>
      </View>

      <View style={$flashListContainer}>
        <FlashList
          contentContainerStyle={$flatListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          estimatedItemSize={200}
          data={mockData}
        />
      </View>
    </Screen>
  )
})
