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
import { save } from "app/utils/storage"
import { STORAGE } from "app/constants/storage"
import useUser from "app/hooks/userUser"

// import { useStores } from "app/models"

interface OtpScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Otp">> {}

export const OtpScreen: FC<OtpScreenProps> = observer(function OtpScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [values, setValues] = useState([null, null, null, null])
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const route = useRoute<RouteProp<AppStackParamList, "Otp">>()

  const [startTimer, setStartTimer] = useState(true)
  const [count, setCount] = useState(60)
  const timer = useRef<NodeJS.Timer>()
  const [error, setError] = useState(false)
  const { setUser } = useUser()

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

  const handleNext = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace") {
      if (index === 0) return
      setActive(index - 1)
      return
    }
    if (index === 3) {
      return
    }
    setActive(index + 1)
  }
  useEffect(() => {
    const _newValues = [...values]
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
    setValues(_newValues)
    // updateValues(null, active)
  }, [active])

  const updateValues = async (val, index) => {
    const _newValues = [...values]
    _newValues[index] = val ? parseInt(val) : null
    setValues([..._newValues])
    if (index === 3) {
      if (_newValues.includes(null)) {
        setError(true)
      } else {
        const enteredCode = _newValues.join("")
        if (enteredCode === "1234") {
          await save(STORAGE.USER, userData)
          setUser(userData)
          navigation.navigate("HomeTab")
        } else {
          setError(true)
        }
      }
    }
  }

  const { userData } = route?.params ?? {}

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
          <View style={$otpInputs}>
            <TextField
              containerStyle={[$inputContainerStyle, error && $errorInput]}
              keyboardType="numeric"
              inputWrapperStyle={$inputWrapper}
              ref={firstRef}
              value={values[0]}
              clearTextOnFocus
              onKeyPress={(e) => handleNext(e, 0)}
              maxLength={1}
              onChangeText={(val) => updateValues(val, 0)}
            />
            <TextField
              containerStyle={[$inputContainerStyle, error && $errorInput]}
              keyboardType="numeric"
              clearTextOnFocus
              ref={secondRef}
              inputWrapperStyle={$inputWrapper}
              value={values[1]}
              onKeyPress={(e) => handleNext(e, 1)}
              maxLength={1}
              onChangeText={(val) => updateValues(val, 1)}
            />
            <TextField
              containerStyle={[$inputContainerStyle, error && $errorInput]}
              keyboardType="numeric"
              ref={thirdRef}
              onKeyPress={(e) => handleNext(e, 2)}
              value={values[2]}
              maxLength={1}
              clearTextOnFocus
              inputWrapperStyle={$inputWrapper}
              onChangeText={(val) => updateValues(val, 2)}
            />
            <TextField
              containerStyle={[$inputContainerStyle, error && $errorInput]}
              keyboardType="numeric"
              ref={fourthRef}
              clearTextOnFocus
              maxLength={1}
              inputWrapperStyle={$inputWrapper}
              onKeyPress={(e) => handleNext(e, 3)}
              value={values[3]}
              onChangeText={(val) => {
                updateValues(val, 3)
              }}
            />
          </View>
          {error && <Text tx="otpScreen.wrongCode" style={$error} />}
        </View>

        <Button
          text={
            error
              ? I18n.translate("otpScreen.reEnter")
              : startTimer
              ? `${I18n.translate("otpScreen.notificationText")} 0:${count}`
              : I18n.translate("otpScreen.sendCodeAgain")
          }
          disabled={error ? false : startTimer}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: "100%" }}
          preset={error ? "default" : startTimer ? "reversed" : "default"}
          onPress={() => {
            error ? setError(false) : setStartTimer(true)
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
  marginTop: moderateVerticalScale(28),
  marginBottom: moderateVerticalScale(40),
  alignItems: "center",
  gap: moderateVerticalScale(8),
}

const $otpInputs: ViewStyle = {
  flexDirection: "row",
  gap: moderateScale(8),
}

const $error: TextStyle = {
  color: colors.palette.angry500,
  fontSize: moderateVerticalScale(14),
  fontFamily: typography.primary.bold,
  lineHeight: moderateVerticalScale(24),
}

const $inputContainerStyle: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: colors.palette.neutral50,
}

const $inputWrapper: ViewStyle = {
  paddingHorizontal: moderateVerticalScale(4),
}

const $errorInput: ViewStyle = {
  borderColor: colors.palette.angry500,
  borderWidth: 1,
}
