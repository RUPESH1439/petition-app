import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { MyPetitionCard } from "./PetitionCard/MyPetitionCard"
import { FlashList } from "@shopify/flash-list"
import useRTL from "app/hooks/useRTL"
import useGetCreatedPetitions from "app/hooks/api/useGetCreatedPetitions"
import formatPetitions from "app/utils/api/formatPetitions"
import useUser from "app/hooks/userUser"

export interface CreatedPetitionsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreatedPetitions = observer(function CreatedPetitions(props: CreatedPetitionsProps) {
  const { style } = props
  const $styles = [$container, style]
  const { isRTL } = useRTL()
  const { user } = useUser()
  const { petitionsData } = useGetCreatedPetitions()
  const petitions = React.useMemo(
    () => formatPetitions(petitionsData, isRTL, user?.owner?.id),
    [petitionsData, isRTL, user],
  )
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
      isAnonymous,
    } = item ?? {}
    return (
      <View style={$cardContainer}>
        <MyPetitionCard
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

  return (
    <View style={$styles}>
      <View style={$container}>
        <FlashList
          contentContainerStyle={$flatListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          estimatedItemSize={200}
          data={petitions}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  height: "100%",
  width: "100%",
  backgroundColor: colors.palette.neutral800,
}

const $cardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $flatListContainer: ViewStyle = { paddingBottom: spacing.extraLarge }
