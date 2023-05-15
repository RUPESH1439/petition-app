import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { MyPetitionCard } from "./PetitionCard/MyPetitionCard"
import { FlashList } from "@shopify/flash-list"

export interface CreatedPetitionsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

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

/**
 * Describe your component here
 */
export const CreatedPetitions = observer(function CreatedPetitions(props: CreatedPetitionsProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$container}>
        <FlashList
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
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
          }}
          estimatedItemSize={200}
          data={mockData}
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
