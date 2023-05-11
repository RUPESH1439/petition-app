import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, View } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { colors } from "app/theme"
import { LinkCard } from "./components/LinkCard"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"
import AntDesign from "react-native-vector-icons/AntDesign"
import useRTL from "app/hooks/useRTL"
import {
  $accountItems,
  $avatar,
  $detailContainer,
  $detailTextStyle,
  $linkCard,
  $linkCardLastChild,
  $linksItemsContainer,
  $nameContainer,
  $phoneNumberContainer,
  $phoneNumberText,
  $root,
} from "./style"
interface AccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Account">> {}

interface AccountItem {
  id: string
  tx: TxKeyPath
  screenName: keyof AppStackParamList
}

const accountItems: AccountItem[] = [
  {
    id: "myInfo",
    tx: "accountScreen.myInfo",
    screenName: "ChooseLanguage",
  },
  {
    id: "customerService",
    tx: "accountScreen.customerService",
    screenName: "CreateAccount",
  },
  {
    id: "privatePolicy",
    tx: "accountScreen.privatePolicy",
    screenName: "CreateAccount",
  },
  {
    id: "settings",
    tx: "accountScreen.settings",
    screenName: "ChooseLanguage",
  },
  {
    id: "logout",
    tx: "accountScreen.logout",
    screenName: "Auth",
  },
]

export const AccountScreen: FC<AccountScreenProps> = observer(function AccountScreen() {
  const { isRTL } = useRTL()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader tx="accountScreen.title" />
      <View style={$detailContainer}>
        <View style={$nameContainer(isRTL)}>
          <Image
            // TODO Remove this hardcode later
            source={{
              uri: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
            }}
            style={$avatar}
          />

          <Text preset="primaryBold" tx="accountScreen.name" style={$detailTextStyle} />
          <AntDesign name={"checkcircle"} size={24} color={colors.palette.primary100} />
        </View>
        <View style={$phoneNumberContainer}>
          <Text tx="accountScreen.phoneNumber" style={[$detailTextStyle, $phoneNumberText]} />
        </View>
      </View>
      <View style={$linksItemsContainer}>
        <FlatList
          data={accountItems}
          numColumns={2}
          contentContainerStyle={$accountItems(isRTL)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <>
              <LinkCard
                tx={item.tx}
                style={$linkCard}
                onPress={() => {
                  navigation.navigate(item.screenName)
                }}
                preset={item.id === "logout" ? "secondary" : "default"}
              />
              {index === accountItems.length - 1 ? <View style={$linkCardLastChild} /> : null}
            </>
          )}
        />
      </View>
    </Screen>
  )
})
