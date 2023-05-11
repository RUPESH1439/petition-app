import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SearchScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Search">> {}

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        tx=""
        buttonTx=""
        onButtonPress={() => navigation.goBack()}
      />
      
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
