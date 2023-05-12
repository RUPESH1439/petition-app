import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { PetitionCard, Screen, ScreenHeader } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { colors, spacing } from "app/theme"
interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader tx="home.header" onButtonPress={() => navigation.goBack()} />
      <View style={$container}>
        <FlashList
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <View style={$cardContainer}>
              <PetitionCard
                city="Bagdad"
                category="Environment"
                viewsCount={12000}
                signsCount={12000}
                name="global organization"
                isOrg={true}
                status="unsigned"
                date={new Date()}
                photoUrl="https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true"
                title={"justice for student"}
                description="give the students which failed exam another chance to be sure"
              />
            </View>
          )}
          estimatedItemSize={200}
          data={[1, 2, 3, 4]}
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
  height: Dimensions.get("screen").height,
  width: Dimensions.get("screen").width,
}

const $cardContainer: ViewStyle = {
  marginTop: spacing.extraSmall,
}
