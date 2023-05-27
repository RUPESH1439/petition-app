import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { PetitionCard } from "./PetitionCard/PetitionCard"
import useGetSignedPetitions from "app/hooks/api/useGetSignedPetitions"
import { IPetition } from "app/hooks/api/interface"
import useRTL from "app/hooks/useRTL"

export interface SignedPetitionsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const SignedPetitions = observer(function SignedPetitions(props: SignedPetitionsProps) {
  const { style } = props
  const $styles = [$container, style]
  const { petitionsData } = useGetSignedPetitions()
  const { isRTL } = useRTL()
  const renderItem = React.useCallback(({ item }) => {
    const {
      id,
      title,
      description,
      governorate,
      category,
      creator,
      signers,
      // eslint-disable-next-line camelcase
      petition_stat,
      createdAt,
      hideName,
    } = (item ?? {}) as IPetition
    return (
      <View style={$cardContainer}>
        <PetitionCard
          id={id}
          city={isRTL ? governorate?.arName : governorate?.enName}
          category={isRTL ? category?.arName : category?.enName}
          // eslint-disable-next-line camelcase
          viewsCount={petition_stat?.views}
          signsCount={signers?.length}
          name={isRTL ? creator?.arName : creator?.enName}
          isOrg={true}
          status={"signed"}
          isPrivileged={creator?.isPrivileged}
          date={new Date(createdAt)}
          photoUrl={creator?.image?.url}
          title={title}
          description={description}
          isAnonymous={hideName}
          signers={signers?.map(({ id }) => id)}
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
          data={petitionsData}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.palette.neutral800,
  height: "100%",
  width: "100%",
}

const $cardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $flatListContainer: ViewStyle = { paddingBottom: spacing.extraLarge }
