import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { PetitionCard, Screen, Text, TextField } from "app/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { SvgXml } from "react-native-svg"
import svgicons from "../../assets/svgs"
import useSearchPetition from "app/hooks/api/useSearchPetition"
import { FlashList } from "@shopify/flash-list"
import formatPetitions from "app/utils/api/formatPetitions"
import useRTL from "app/hooks/useRTL"
import useUser from "app/hooks/userUser"

const { search } = svgicons
// import { useStores } from "app/models"

interface SearchScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Search">> {}

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [searchedText, setSearchedText] = React.useState<null | string>(null)
  const [debouncedSearch, setDebouncedSearch] = React.useState(searchedText)

  const { isRTL } = useRTL()
  const { user } = useUser()

  const { petitionsData } = useSearchPetition(debouncedSearch)
  const mappedPetitionsData = React.useMemo(
    () => formatPetitions(petitionsData, isRTL, user?.owner?.id),
    [petitionsData, isRTL],
  )
  let timer

  React.useEffect(() => {
    timer = setTimeout(() => {
      setDebouncedSearch(searchedText)
    }, 500)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [searchedText])

  const renderItem = React.useCallback(({ item }) => {
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
        />
      </View>
    )
  }, [])

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={$topContainer}>
        <TextField
          placeholderTx="search.searchPlaceholder"
          placeholderTextColor={colors.palette.gray200}
          LeftAccessory={() => (
            <SvgXml
              xml={search}
              height={22}
              width={22}
              fill={colors.palette.gray100}
              style={$searchIcon}
            />
          )}
          onChangeText={(text) => setSearchedText(text)}
          style={$textField}
        />
      </View>
      <View style={$container}>
        <FlashList
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          estimatedItemSize={200}
          data={mappedPetitionsData ?? []}
          ListEmptyComponent={() => (
            <View style={$textContainer}>
              <Text tx="search.bodyText" style={$textStyle} />
            </View>
          )}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $topContainer: ViewStyle = {
  justifyContent: "space-between",
  borderBottomColor: "#00000029",
  backgroundColor: colors.palette.neutral50,
  paddingHorizontal: spacing.medium,
  paddingBottom: spacing.small,
  elevation: 2,
  shadowColor: "#00000029",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 1.5,
  height: 90,
  paddingVertical: moderateVerticalScale(26),
}

const $searchIcon: TextStyle = {
  left: 10,
  top: 10,
  paddingRight: 40,
}

const $textField: ViewStyle = {
  minHeight: moderateVerticalScale(14),
}

const $textContainer: ViewStyle = {
  margin: moderateVerticalScale(18),
  alignItems: "center",
  justifyContent: "center",
  paddingTop: moderateVerticalScale(118),
}

const $textStyle: TextStyle = {
  fontFamily: typography.primary.semibold,
  fontSize: moderateVerticalScale(18),
  color: colors.palette.neutral100,
  lineHeight: moderateVerticalScale(31),
  marginBottom: "10%",
}

const $container: ViewStyle = {
  height: Dimensions.get("screen").height * 0.73,
  width: Dimensions.get("screen").width,
  zIndex: 499,
}

const $cardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}
