import React, { FC, useCallback } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
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
import useFormattedGovernorates, { ALL_GOVERNORATES_ID } from "app/hooks/useFormattedGovernorates"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { isRTL } = useRTL()
  const { user } = useUser()
  const queryClient = useQueryClient()
  const { governorates, setGovernorates } = useFormattedGovernorates(false, true)
  const [governorateFilter, setGovernorateFilter] = React.useState([])
  const [governorateSelected, setGovernorateSelected] = React.useState<null | number>(null)
  const { petitionsData, fetchPetitions, petitionInitalLoading } =
    useGetPetitions(governorateFilter)
  const mappedPetitionsData = React.useMemo(
    () => formatPetitions(petitionsData, isRTL, user?.owner?.id),
    [petitionsData, isRTL],
  )
  const renderItem = useCallback(
    ({ item }) => {
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
        signers,
        petitionImageUrl,
        creatorId,
        petitionStatId,
      } = item ?? {}
      return (
        <View style={$cardContainer} key={id}>
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
            isAnonymous={isAnonymous}
            signers={signers}
            petitionImageUrl={petitionImageUrl}
            creatorId={creatorId}
            petitionStatId={petitionStatId}
          />
        </View>
      )
    },
    [governorateFilter],
  )

  React.useEffect(() => {
    if (governorateFilter?.length > 0) {
      fetchPetitions()
    }
  }, [governorateFilter])

  React.useEffect(() => {
    const _governorates = [...governorates.map(({ value }) => value)]
    setGovernorateFilter(_governorates)
    setGovernorateSelected(user?.governorate?.id)
  }, [governorates])

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS.GET_PETITIONS] })
    }, []),
  )

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]}>
      <ScreenHeader
        tx="home.header"
        isHome={true}
        style={$screenHeader}
        onButtonPress={() => navigation.goBack()}
        RightAccessory={
          <Dropdown
            items={governorates}
            placeholderTx="home.governorate"
            placeholderStyle={$dropdownPlaceholder}
            setItems={setGovernorates}
            onChange={(value) => {
              const _val = parseInt(value)
              let filters = [_val]
              if (_val === ALL_GOVERNORATES_ID) {
                filters = governorates?.map((gov) => gov?.value)
              }
              setGovernorateFilter(filters)
              setGovernorateSelected(parseInt(value))
            }}
            value={governorateSelected}
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
        {petitionInitalLoading ? (
          <ActivityIndicator size="large" color={colors.palette.primary100} />
        ) : (
          <FlashList
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            estimatedItemSize={200}
            data={mappedPetitionsData ?? []}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => fetchPetitions()}
                tintColor={colors.palette.primary100}
              />
            }
          />
        )}
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
  justifyContent: "center",
}

const $cardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $screenHeader: ViewStyle = { zIndex: 999 }

const $dropDownText: TextStyle = {
  fontSize: moderateVerticalScale(14),
  lineHeight: moderateVerticalScale(42),
}

const $dropdownPlaceholder: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: moderateVerticalScale(14),
  lineHeight: moderateVerticalScale(33),
}

const $dropdownContainer: ViewStyle = {
  paddingVertical: 7,
  borderRadius: moderateVerticalScale(24),
}
