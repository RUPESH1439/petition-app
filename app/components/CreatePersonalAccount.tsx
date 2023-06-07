import * as React from "react"
import { Alert, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { TextField } from "./TextField"
import { Button } from "./Button"
import { Dropdown } from "./Dropdown"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import useFormattedGenders from "app/hooks/useFormattedGenders"
import useFormattedGovernorates from "app/hooks/useFormattedGovernorates"
import useCreateUser from "app/hooks/api/useCreateUser"
import NetInfo from "@react-native-community/netinfo"
import { ScrollView } from "react-native-gesture-handler"
import { moderateVerticalScale } from "app/utils/scaling"
import phoneValidation from "app/schemas/phoneValidation"
import useLogin from "app/hooks/api/useLogin"
import { Picker } from "react-native-wheel-pick"
import { getYearRange } from "app/utils/getYears"

export interface CreatePersonalAccountProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreatePersonalAccount = observer(function CreatePersonalAccount() {
  const { genders, setGenders } = useFormattedGenders()
  const { governorates, setGovernorates } = useFormattedGovernorates(true)
  const { isCreating, createUser, isSuccess, createError } = useCreateUser("personal")
  const [dobFocused, setDobFocused] = React.useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const schema = z.object({
    name: z
      .string()
      // eslint-disable-next-line no-useless-escape
      .regex(/^[\u0600-\u06FF\s!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/)
      .min(1),
    birthdateYear: z.string().length(4),
    phoneNumber: phoneValidation,
    gender: z.number(),
    governorate: z.number(),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: null,
      birthdateYear: null,
      phoneNumber: null,
      gender: null,
      governorate: null,
    },
  })
  const onSubmit = async (data) => {
    const netInfo = await NetInfo.fetch()
    await createUser({ ...data, ip: netInfo?.details?.ipAddress })
  }

  const governorate = watch("governorate")
  const gender = watch("gender")
  const phone = watch("phoneNumber")

  const { login, userData, isLogging } = useLogin(phone)

  React.useEffect(() => {
    if (isSuccess) {
      login()
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (userData?.id) {
      navigation.navigate("Otp", {
        phone,
        userData,
      })
    }
  }, [userData?.id, isLogging])

  React.useEffect(() => {
    if (createError) {
      Alert.alert(createError?.message)
    }
  }, [createError])

  return (
    <View style={$container}>
      <ScrollView>
        <TextField
          control={control}
          name="name"
          status={errors?.name ? "error" : null}
          error={errors?.name ? "errors.pleaseFill" : null}
          placeholderTx="createPersonalAccount.name"
          containerStyle={$textInput}
        />

        <TextField
          control={control}
          name="birthdateYear"
          keyboardType="number-pad"
          status={errors?.birthdateYear ? "error" : null}
          error={errors?.birthdateYear ? "errors.pleaseFill" : null}
          placeholderTx="createPersonalAccount.dateOfBirth"
          containerStyle={$textInput}
          onBlur={() => setDobFocused(false)}
          showSoftInputOnFocus={false}
          onPressIn={() => setDobFocused(true)}
        />
        {!!dobFocused && (
          <Picker
            style={$pickerInput}
            pickerData={getYearRange()}
            onValueChange={(value) => {
              setValue("birthdateYear", value)
              setDobFocused(false)
            }}
          />
        )}
        <View style={[$dropdownGenderList, $textInput]}>
          <Dropdown
            items={genders}
            setItems={setGenders}
            placeholderTx="createPersonalAccount.gender"
            onChange={(value) => {
              setValue("gender", value)
            }}
            error={!gender && errors?.gender ? "errors.pleaseChoose" : null}
          />
        </View>

        <View style={[$dropdownList, $textInput]}>
          <Dropdown
            items={governorates}
            setItems={setGovernorates}
            placeholderTx="createPersonalAccount.governorate"
            onChange={(value) => {
              setValue("governorate", value)
            }}
            error={!governorate && errors?.governorate ? "errors.pleaseChoose" : null}
          />
        </View>

        <TextField
          control={control}
          name="phoneNumber"
          maxLength={11}
          status={errors?.phoneNumber ? "error" : null}
          errorText={errors?.phoneNumber?.message as string}
          placeholderTx="createPersonalAccount.mobileNumber"
          keyboardType="numeric"
        />

        <Button
          loading={isCreating}
          tx="common.continue"
          style={$continueBtn}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: moderateVerticalScale(38),
  flex: 1,
}

const $continueBtn: ViewStyle = {
  marginTop: moderateVerticalScale(38),
}

const $dropdownGenderList: ViewStyle = {
  zIndex: 999,
}

const $dropdownList: ViewStyle = {
  zIndex: 899,
}

const $textInput: ViewStyle = {
  marginBottom: spacing.extraMedium,
}

const $pickerInput: ViewStyle = {
  backgroundColor: colors.palette.neutral50,
  width: "100%",
  height: 215,
}
