import React, { FC, useCallback, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Dropdown, PetitionCard, Screen, ScreenHeader } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { colors, spacing } from "app/theme"
import useRTL from "app/hooks/useRTL"
import { moderateVerticalScale } from "app/utils/scaling"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

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
    status: "unsigned",
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

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { isRTL } = useRTL()
  const renderItem = useCallback(({ item }) => {
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
      isAnonymous,
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
          isAnonymous={isAnonymous}
        />
      </View>
    )
  }, [])

  const mockCities = [
    { id: "bagdad", nameAr: "بغداد", nameEn: "Baghdad" },
    { id: "iraq", nameAr: "العراق", nameEn: "Iraq" },
  ]

  const _cities = mockCities.map(({ id, nameAr, nameEn }) => ({
    label: isRTL ? nameAr : nameEn,
    value: id,
  }))

  const [cities, setCities] = React.useState(_cities)

  useEffect(() => {
    setCities(_cities)
  }, [isRTL])

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]}>
      <ScreenHeader
        tx="home.header"
        style={$screenHeader}
        onButtonPress={() => navigation.goBack()}
        RightAccessory={
          <Dropdown
            items={cities}
            value={cities[0].value}
            setItems={setCities}
            onChange={(value) => {
              console.log("value", value)
            }}
            dropdownTextStyle={{ color: colors.palette.neutral50 }}
            style={{
              width: moderateVerticalScale(130),
              height: moderateVerticalScale(38),
            }}
            dropDownContainerStyle={$dropdownContainer}
            propTextStyle={$dropDownText}
            iconStyle={{ marginRight: moderateVerticalScale(8) }}
          />
        }
      />
      <View style={$container}>
        <FlashList
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          estimatedItemSize={200}
          data={mockData}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral800,
}

const $container: ViewStyle = {
  height: Dimensions.get("screen").height * 0.73,
  width: Dimensions.get("screen").width,
  zIndex: 499,
}

const $cardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $screenHeader: ViewStyle = { zIndex: 999 }

const $dropDownText: TextStyle = {
  fontSize: moderateVerticalScale(14),
  lineHeight: moderateVerticalScale(42),
}

const $dropdownContainer: ViewStyle = {
  paddingVertical: 7,
  borderRadius: moderateVerticalScale(24),
}
