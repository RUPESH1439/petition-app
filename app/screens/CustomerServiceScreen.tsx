import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import Entypo from "react-native-vector-icons/Entypo"
import useRTL from "app/hooks/useRTL"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"

interface CustomerServiceScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CustomerService">> {}

const contactLinks = [
  { id: "facebook", nameAr: "واتساب", nameEn: "Facebook" },
  { id: "phone", nameAr: "موبايل", nameEn: "Phone" },
  { id: "Instagram", nameAr: "فيسبوك", nameEn: "Instagram" },
  { id: "telegram", nameAr: "تلكرام", nameEn: "Telegram" },
]

export const CustomerServiceScreen: FC<CustomerServiceScreenProps> = observer(
  function CustomerServiceScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const { isRTL } = useRTL()

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="customerServiceScreen.title"
          presets="backAndTitle"
          onButtonPress={() => navigation.goBack()}
        />
        <Pressable style={$parentContainer(isRTL)}>
          <Text tx="customerServiceScreen.heading" style={$textStyle} />
          {contactLinks.map(({ id, nameEn, nameAr }) => (
            <View key={id} style={$contactsContainer}>
              <Text style={$textStyle}>{`${isRTL ? nameAr : nameEn}`}</Text>
              <Entypo
                name={isRTL ? "chevron-left" : "chevron-right"}
                size={24}
                color={colors.palette.neutral100}
              />
            </View>
          ))}
        </Pressable>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $parentContainer = (isRTL: boolean): ViewStyle => ({
  padding: spacing.extraMedium,
  gap: moderateVerticalScale(38),
  direction: isRTL ? "rtl" : "ltr",
  marginTop: spacing.extraMedium,
})

const $contactsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $textStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  fontFamily: typography.primary.bold,
  color: colors.palette.neutral100,
  lineHeight: moderateVerticalScale(30),
}
