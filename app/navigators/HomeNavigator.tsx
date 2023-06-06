import React from "react"
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs"

import { SvgXml } from "react-native-svg"
import { AccountScreen } from "app/screens"
import icons from "../../assets/svgs"
import { colors, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import I18n from "i18n-js"
import { View } from "react-native"
import useRTL from "app/hooks/useRTL"
import NotesFilled from "app/components/Icons/NotesFilled"
import { HomeStackNavigator } from "./HomeStackNavigator"
import { SearchStackNavigator } from "./SearchStackNavigator"
import { MyPetitionStackNavigator } from "./MyPetitionStackNavigator"

const { home, user, search, notes, homeFilled, userFilled, searchFilled } = icons
export type HomeNavigatorParamList = {
  Profile: undefined
  MyPetitions: undefined
  Search: undefined
  Home: undefined
}

const BottomTab = createMaterialTopTabNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  const { isRTL } = useRTL()
  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      screenOptions={screenOptions(isRTL)}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: I18n.t("homeTab.home"),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgXml
                xml={homeFilled}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={colors.palette.primary200}
              />
            ) : (
              <SvgXml
                xml={home}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={colors.palette.gray100}
              />
            ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: I18n.t("homeTab.search"),
          tabBarIconStyle: {
            marginRight: moderateVerticalScale(10),
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgXml
                xml={searchFilled}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={colors.palette.primary200}
              />
            ) : (
              <SvgXml
                xml={search}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={colors.palette.gray100}
              />
            ),
        }}
      />
      <BottomTab.Screen
        name="MyPetitions"
        component={MyPetitionStackNavigator}
        options={{
          tabBarLabel: I18n.t("homeTab.myPetitions"),

          tabBarIcon: ({ focused }) =>
            focused ? (
              <NotesFilled height={moderateVerticalScale(26)} width={moderateVerticalScale(26)} />
            ) : (
              <SvgXml
                xml={notes}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={colors.palette.gray100}
              />
            ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarLabel: I18n.t("homeTab.profile"),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgXml
                xml={userFilled}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={colors.palette.primary200}
              />
            ) : (
              <View>
                <SvgXml
                  xml={user}
                  height={moderateVerticalScale(26)}
                  width={moderateVerticalScale(26)}
                  fill={colors.palette.gray100}
                />
              </View>
            ),
        }}
      />
    </BottomTab.Navigator>
  )
}

const screenOptions = (isRTL: boolean): MaterialTopTabNavigationOptions => ({
  tabBarStyle: {
    height: moderateVerticalScale(88),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    direction: isRTL ? "rtl" : "ltr",
  },
  tabBarActiveTintColor: colors.palette.primary200,
  tabBarInactiveTintColor: colors.palette.gray100,
  tabBarLabelStyle: {
    fontFamily: typography.primary.bold,
    fontSize: moderateVerticalScale(11),
    lineHeight: moderateVerticalScale(20),
    textTransform: "none",
    marginTop: moderateVerticalScale(8),
  },
  tabBarIndicatorStyle: {
    position: "absolute",
    top: 0,
    width: moderateVerticalScale(74),
    left: moderateVerticalScale(4),
    backgroundColor: colors.palette.primary100,
    height: 3,
    borderRadius: 3,
  },
  tabBarItemStyle: {
    paddingHorizontal: 0,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  tabBarIconStyle: {
    marginRight: moderateVerticalScale(7),
  },
})
