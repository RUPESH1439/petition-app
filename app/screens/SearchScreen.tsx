import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, TextField } from "app/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { SvgXml } from "react-native-svg"
import svgicons from "../../assets/svgs"

const { search } = svgicons
// import { useStores } from "app/models"

interface SearchScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Search">> {}

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

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
        style={$textField}
      />
    </View>
    <View style={$textContainer}>
      <Text tx="search.bodyText" style={$textStyle} />
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
  height: moderateVerticalScale(24),
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