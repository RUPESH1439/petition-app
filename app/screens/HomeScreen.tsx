import React, { FC, useCallback, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Dropdown, PetitionCard, Screen, ScreenHeader } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { colors, spacing } from "app/theme"
import useRTL from "app/hooks/useRTL"
import { moderateVerticalScale } from "app/utils/scaling"
import useGetPetitions from "app/hooks/api/useGetPetitions"
import useUser from "app/hooks/userUser"
import formatPetitions from "app/utils/api/formatPetitions"
import { useQueryClient } from "@tanstack/react-query"
import { API_KEYS } from "app/constants/apiKeys"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { isRTL } = useRTL()
  const { user } = useUser()
  const { petitionsData } = useGetPetitions()
  const queryClient = useQueryClient()

  const mappedPetitionsData = React.useMemo(
    () => formatPetitions(petitionsData, isRTL, user?.owner?.id),
    [petitionsData],
  )
  const renderItem = useCallback(({ item }) => {
    const {
      id,
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
      <View style={$cardContainer} key={id}>
        <PetitionCard
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

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
    }, []),
  )

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
          data={mappedPetitionsData ?? []}
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
