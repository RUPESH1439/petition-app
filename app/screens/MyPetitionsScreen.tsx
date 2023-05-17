import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, CreatedPetitions, Screen, ScreenHeader, SignedPetitions } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import I18n from "i18n-js"
import useRTL from "app/hooks/useRTL"
interface MyPetitionsScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"MyPetitions">> {}

const renderScene = SceneMap({
  createdPetitions: CreatedPetitions,
  signedPetitions: SignedPetitions,
})

export const MyPetitionsScreen: FC<MyPetitionsScreenProps> = observer(function MyPetitionsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const [index, setIndex] = React.useState(0)
  const layout = useWindowDimensions()
  const { isRTL: _ } = useRTL()

  const routes = [
    { key: "createdPetitions", title: I18n.t("myPetitions.created") },
    { key: "signedPetitions", title: I18n.t("myPetitions.signed") },
  ]

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        style={$header}
        tx="myPetitions.header"
        presets="backAndTitle"
        onButtonPress={() => navigation.goBack()}
        RightAccessory={
          <Button
            tx="myPetitions.newPetition"
            onPress={() => navigation.navigate("CreatePetition")}
            style={$createPetition}
            textStyle={$createPetitionText}
            LeftAccessory={() => (
              <FontAwesome5
                name="plus"
                size={18}
                color={colors.palette.neutral50}
                style={$plusIcon}
              />
            )}
          />
        }
        BottomAccessory={
          <View style={$tabContainer}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={$tabBar}
                  labelStyle={$labelStyle}
                  tabStyle={$tabStyle}
                  indicatorStyle={$indicator}
                />
              )}
            />
          </View>
        }
        bottomStyle={$headerBottomContainer}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $header: ViewStyle = {
  marginTop: spacing.extraMedium,
}

const $plusIcon: ViewStyle = {
  marginRight: spacing.extraSmall,
}

const $createPetition: ViewStyle = {
  minHeight: moderateVerticalScale(0),
  paddingHorizontal: moderateVerticalScale(12.75),
  height: moderateVerticalScale(38),
  paddingVertical: moderateVerticalScale(5),
}

const $createPetitionText: TextStyle = {
  fontSize: moderateVerticalScale(14),
  lineHeight: moderateVerticalScale(26),
}

const $tabContainer: ViewStyle = {
  height: "100%",
  paddingTop: spacing.medium,
}

const $labelStyle: TextStyle = {
  color: colors.palette.primary100,
  fontFamily: typography.primary.extraBold,
  textTransform: "none",
  fontSize: moderateVerticalScale(16),
}

const $tabStyle: TextStyle = {
  color: colors.palette.primary100,
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral50,
}

const $indicator: ViewStyle = {
  backgroundColor: colors.palette.primary100,
}

const $headerBottomContainer: ViewStyle = { paddingHorizontal: 0 }
