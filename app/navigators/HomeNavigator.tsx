import React from "react"
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs"

import { SvgXml } from "react-native-svg"
import { ProfileScreen, MyPetitionsScreen, SearchScreen, HomeScreen } from "app/screens"
import icons from "../../assets/svgs"
import { colors, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import I18n from "i18n-js"
import { View } from "react-native"

const { home, user, search, notes } = icons
export type HomeNavigatorParamList = {
  Profile: undefined
  MyPetitions: undefined
  Search: undefined
  Home: undefined
}

const BottomTab = createMaterialTopTabNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <BottomTab.Navigator tabBarPosition="bottom" screenOptions={screenOptions}>
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: I18n.t("homeTab.profile"),
          tabBarIcon: ({ focused }) => (
            <View>
              <SvgXml
                xml={user}
                height={moderateVerticalScale(26)}
                width={moderateVerticalScale(26)}
                fill={focused ? colors.palette.primary200 : colors.palette.gray100}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPetitions"
        component={MyPetitionsScreen}
        options={{
          tabBarLabel: I18n.t("homeTab.myPetitions"),

          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={notes}
              height={moderateVerticalScale(26)}
              width={moderateVerticalScale(26)}
              fill={focused ? colors.palette.primary200 : colors.palette.gray100}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: I18n.t("homeTab.search"),
          tabBarIconStyle: {
            marginRight: moderateVerticalScale(10),
          },
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={search}
              height={moderateVerticalScale(26)}
              width={moderateVerticalScale(26)}
              fill={focused ? colors.palette.primary200 : colors.palette.gray100}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: I18n.t("homeTab.home"),
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={home}
              height={moderateVerticalScale(26)}
              width={moderateVerticalScale(26)}
              fill={focused ? colors.palette.primary200 : colors.palette.gray100}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

const screenOptions: MaterialTopTabNavigationOptions = {
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
    left: moderateVerticalScale(8),
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
}
