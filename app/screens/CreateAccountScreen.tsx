import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, useWindowDimensions } from "react-native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, typography } from "app/theme"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateAccountScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreateAccount">> {}

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: "#ff4081" }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

export const CreateAccountScreen: FC<CreateAccountScreenProps> = observer(
  function CreateAccountScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    const tabs = [
      { key: "personal", label: "Personal" },
      { key: "organization", label: "Organization" },
    ]
    const layout = useWindowDimensions()

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
      { key: "first", title: "First" },
      { key: "second", title: "Second" },
    ])
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
                style={{
                  backgroundColor: colors.palette.neutral200,
                }}
                labelStyle={{
                  color: colors.palette.primary100,
                  fontFamily: typography.primary.bold,
                }}
                tabStyle={{ color: colors.palette.primary100 }}
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
