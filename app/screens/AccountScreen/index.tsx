import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { moderateVerticalScale } from "app/utils/scaling"
import { colors, spacing, typography } from "app/theme"
import { LinkCard } from "./components/LinkCard"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"
import AntDesign from "react-native-vector-icons/AntDesign"
import useRTL from "app/hooks/useRTL"
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
    screenName: "CreateAccount",
  },
  {
    id: "logout",
    tx: "accountScreen.logout",
    screenName: "CreateAccount",
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

const $root: ViewStyle = {
  flex: 1,
}
const $detailContainer: ViewStyle = {
  gap: 10,
  marginTop: spacing.huge,
}

const $nameContainer = (isRTL: boolean): ViewStyle => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: moderateVerticalScale(10),
  direction: isRTL ? "rtl" : "ltr",
})

const $avatar: ImageStyle = { width: 32, height: 32, borderRadius: 16 }

const $detailTextStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  textAlign: "center",
  lineHeight: 30,
  color: colors.palette.neutral100,
}

const $phoneNumberContainer: ViewStyle = {
  alignItems: "center",
}

const $phoneNumberText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(20),
}

const $linksItemsContainer: ViewStyle = {
  flexDirection: "row",
  gap: moderateVerticalScale(18),
  flexWrap: "wrap",
  paddingTop: spacing.extraLarge,
}

const $linkCard: ViewStyle = {
  flex: 1,
  marginRight: spacing.medium,
}

const $linkCardLastChild: ViewStyle = {
  flex: 1,
  marginRight: spacing.medium * 2,
}

const $accountItems = (isRTL: boolean): ViewStyle => ({
  columnGap: spacing.medium,
  rowGap: spacing.medium,
  paddingLeft: spacing.medium,
  direction: isRTL ? "rtl" : "ltr",
})
