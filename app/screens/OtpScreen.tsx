import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Screen, ScreenHeader, Text, TextField } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { moderateScale, moderateVerticalScale } from "app/utils/scaling"
import { colors, spacing, typography } from "app/theme"
import I18n from "i18n-js"

// import { useStores } from "app/models"

interface OtpScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Otp">> {}

export const OtpScreen: FC<OtpScreenProps> = observer(function OtpScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const route = useRoute<RouteProp<AppStackParamList, "Otp">>()

  const [startTimer, setStartTimer] = useState(false)
  const [count, setCount] = useState(60)
  const timer = useRef<NodeJS.Timer>()

  useEffect(() => {
    if (!startTimer) {
      clearInterval(timer.current)
      return
    }
    timer.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1
        } else {
          setCount(60)
          setStartTimer(false)
        }
      })
    }, 1000)
    return () => clearInterval(timer.current)
  }, [startTimer])

  const [active, setActive] = React.useState(0)

  const firstRef = React.useRef<TextInput>(null)
  const secondRef = React.useRef<TextInput>(null)
  const thirdRef = React.useRef<TextInput>(null)
  const fourthRef = React.useRef<TextInput>(null)

  const handleNext = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace") {
      if (active === 0) return
      setActive((prev) => prev - 1)
      return
    }
    if (active === 3) return

    setActive((prev) => prev + 1)
  }
  useEffect(() => {
    switch (active) {
      case 0:
        firstRef.current.focus()
        break
      case 1:
        secondRef.current.focus()
        break

      case 2:
        thirdRef.current.focus()
        break

      case 3:
        fourthRef.current.focus()
        break
    }
  }, [active])
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <ScreenHeader
        tx="common.confirmation"
        buttonTx="common.cancel"
        onButtonPress={() => navigation.goBack()}
      />
      <View style={$container}>
        <View style={$headerContainer}>
          <Text tx="otpScreen.headerTopPart" style={$header} />
          <Text tx="otpScreen.headerBottomPart" style={$header} />
        </View>
        <Text style={$phoneNumber}>{route.params.phone}</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={$changeNum} tx="otpScreen.changeNum" />
        </Pressable>
        <View style={$otpContainer}>
          <TextField
            containerStyle={$inputContainerStyle}
            keyboardType="numeric"
            ref={firstRef}
            onKeyPress={handleNext}
            onChange={() => {
              // setActive(1)
            }}
          />
          <TextField
            containerStyle={$inputContainerStyle}
            keyboardType="numeric"
            ref={secondRef}
            onKeyPress={handleNext}
            onChange={() => {
              // setActive(2)
            }}
          />
          <TextField
            containerStyle={$inputContainerStyle}
            keyboardType="numeric"
            ref={thirdRef}
            onKeyPress={handleNext}
            onChange={(val) => {
              console.log("val", val)
              // setActive(3)
            }}
          />
          <TextField
            containerStyle={$inputContainerStyle}
            keyboardType="numeric"
            ref={fourthRef}
            onKeyPress={handleNext}
            onChange={(val) => {
              // setActive(0)
            }}
          />
        </View>

        <Button
          text={
            startTimer
              ? `${I18n.translate("otpScreen.notificationText")} 0:${count}`
              : I18n.translate("otpScreen.sendCodeAgain")
          }
          disabled={startTimer}
          style={{ width: "100%" }}
          preset={startTimer ? "reversed" : "default"}
          onPress={() => {
            setStartTimer(true)
          }}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.extraMedium,
  paddingTop: spacing.large,
  justifyContent: "center",
  alignItems: "center",
}

const $headerContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $header: TextStyle = {
  lineHeight: moderateVerticalScale(30),
  fontSize: moderateVerticalScale(19),
  color: colors.palette.neutral900,
  fontFamily: typography.primary.bold,
  textAlign: "center",
}

const $phoneNumber: TextStyle = {
  lineHeight: moderateVerticalScale(40),
  fontSize: moderateVerticalScale(22),
  color: colors.palette.secondary600,
  fontFamily: typography.primary.bold,
  textAlign: "right",
}

const $changeNum: TextStyle = {
  lineHeight: moderateVerticalScale(22),
  fontSize: moderateVerticalScale(14),
  color: colors.palette.neutral100,
  fontFamily: typography.primary.bold,
  textAlign: "center",
  textDecorationLine: "underline",
}

const $otpContainer: ViewStyle = {
  flexDirection: "row",
  gap: moderateScale(8),
  marginTop: moderateVerticalScale(28),
  marginBottom: moderateVerticalScale(64),
}

const $inputContainerStyle: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: colors.palette.neutral50,
}

const $btnText: TextStyle = {
  // lineHeight: moderateVerticalScale(27),
  fontSize: moderateVerticalScale(14),
  color: colors.palette.neutral100,
  fontFamily: typography.primary.bold,
  textAlign: "center",
  paddingHorizontal: moderateScale(30),
}
