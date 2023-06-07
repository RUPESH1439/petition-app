import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"
import svgs from "assets/svgs"
import { colors, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { loadString } from "app/utils/storage"
import { STORAGE } from "app/constants/storage"

interface SplashScreen2ScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"SplashScreen2">> {}

export const SplashScreen2Screen: FC<SplashScreen2ScreenProps> = observer(
  function SplashScreen2Screen() {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    let timer
    const checkFirstTimerUser = async () => {
      const user = await loadString(STORAGE.USER)
      if (user) {
        navigation.navigate("HomeTab")
        return
      }
      const _preference = await loadString(STORAGE.LANGUAGE)
      if (!_preference) {
        navigation.navigate("ChooseLanguage")
      } else {
        navigation.navigate("Auth")
      }
    }
    React.useEffect(() => {
      timer = setTimeout(() => {
        checkFirstTimerUser()
      }, 2000)
      return () => clearTimeout(timer)
    }, [])
    return (
      <Screen contentContainerStyle={$root} preset="fixed">
        <SvgXml xml={svgs.orgLogo} height={150} width={150} color="red" />
        <Text text="منصة سنبلة" style={$text} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $text: TextStyle = {
  color: colors.palette.primary100,
  fontSize: moderateVerticalScale(24),
  lineHeight: moderateVerticalScale(56),
  fontFamily: typography.primary.bold,
  marginTop: moderateVerticalScale(8),
}
