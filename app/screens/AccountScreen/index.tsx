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
import useUser from "app/hooks/userUser"
interface AccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Account">> {}

interface AccountItem {
  id: string
  tx: TxKeyPath
  screenName: keyof AppStackParamList
}

export const AccountScreen: FC<AccountScreenProps> = observer(function AccountScreen() {
  const { isRTL } = useRTL()
  const { user, logout } = useUser()
  const { id, name, owner, enName, arName } = (user ?? {}) as any

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { isPrivileged, phoneNumber, userType } = owner ?? {}
  // TODO move this logic from backend
  const isOrganization = userType === "organization"
  let _name
  if (isOrganization) {
    _name = isRTL ? arName : enName
  } else {
    _name = name
  }

  const loggedInAccountItems: AccountItem[] = [
    {
      id: "myInfo",
      tx: "accountScreen.myInfo",
      screenName: isOrganization ? "EditOrganizationalInfo" : "EditPersonalInfo",
    },
    {
      id: "customerService",
      tx: "accountScreen.customerService",
      screenName: "CustomerService",
    },
    {
      id: "privatePolicy",
      tx: "accountScreen.privatePolicy",
      screenName: "PrivacyPolicy",
    },
    {
      id: "settings",
      tx: "accountScreen.settings",
      screenName: "Settings",
    },
    {
      id: "logout",
      tx: "accountScreen.logout",
      screenName: "Auth",
    },
  ]
  const guestAccountItems: AccountItem[] = [
    {
      id: "login",
      tx: "accountScreen.login",
      screenName: "SignIn",
    },
    {
      id: "signUP",
      tx: "accountScreen.signUP",
      screenName: "CreateAccount",
    },
  ]

  const isLoggedIn = !!id

  const accountItems = isLoggedIn ? loggedInAccountItems : guestAccountItems

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader tx="accountScreen.title" />
      {isLoggedIn ? (
        <View style={$detailContainer}>
          <View style={$nameContainer(isRTL)}>
            {!!isOrganization && (
              <Image
                // TODO Remove this hardcode later
                source={{
                  uri: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
                }}
                style={$avatar}
              />
            )}

            <Text preset="primaryBold" text={_name ?? ""} style={$detailTextStyle} />
            {!!isPrivileged && (
              <AntDesign name={"checkcircle"} size={24} color={colors.palette.primary100} />
            )}
          </View>
          <View style={$phoneNumberContainer}>
            <Text text={phoneNumber ?? ""} style={[$detailTextStyle, $phoneNumberText]} />
          </View>
        </View>
      ) : null}

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
                onPress={async () => {
                  if (item.id === "logout") {
                    await logout()
                  }
                  navigation.navigate(item.screenName)
                }}
                preset={item.id === "logout" ? "secondary" : "default"}
              />
              {index === accountItems.length - 1 && isLoggedIn ? (
                <View style={$linkCardLastChild} />
              ) : null}
            </>
          )}
        />
      </View>
    </Screen>
  )
})
