import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import {
  CreateOrganizationAccount,
  CreatePersonalAccount,
  Screen,
  ScreenHeader,
} from "app/components"

import { useNavigation } from "@react-navigation/native"
import { colors, typography } from "app/theme"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import I18n from "i18n-js"
import { moderateVerticalScale } from "app/utils/scaling"
import useRTL from "app/hooks/useRTL"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateAccountScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateAccount">> {}

const renderScene = SceneMap({
  personal: CreatePersonalAccount,
  organization: CreateOrganizationAccount,
})

export const CreateAccountScreen: FC<CreateAccountScreenProps> = observer(
  function CreateAccountScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    const layout = useWindowDimensions()
    const { isRTL } = useRTL()
    const [index, setIndex] = React.useState(isRTL ? 1 : 0)
    const _routes = [
      { key: "personal", title: I18n.t("createAccount.personal") },
      { key: "organization", title: I18n.t("createAccount.organization") },
    ]
    const routes = isRTL ? _routes.reverse() : _routes

    React.useEffect(() => {
      if (isRTL) {
        setIndex(1)
      }
    }, [isRTL])

    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="createAccount.title"
          buttonTx="common.cancel"
          onButtonPress={() => navigation.goBack()}
          hideBorder
        />

        <View style={$container}>
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
                inactiveColor={colors.palette.gray200}
                indicatorStyle={$indicator}
              />
            )} // <-- add this line
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flexGrow: 1,
  height: "100%",
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
