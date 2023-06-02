import * as React from "react"
import { Alert, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"
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
import I18n from "i18n-js"
import useCreateUser from "app/hooks/api/useCreateUser"
import NetInfo from "@react-native-community/netinfo"

const schema = z.object({
  name: z.string().min(1),
  birthdateYear: z.string().length(4),
  phoneNumber: z.string().length(11),
  gender: z.number(),
  governorate: z.number(),
})

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
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

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
  const phoneNumber = watch("phoneNumber")
  const onSubmit = async (data) => {
    const netInfo = await NetInfo.fetch()
    await createUser({ ...data, ip: netInfo?.details?.ipAddress })
  }

  const governorate = watch("governorate")
  const gender = watch("gender")

  React.useEffect(() => {
    if (isSuccess) {
      navigation.navigate("SignIn")
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (createError) {
      Alert.alert(createError?.message)
    }
  }, [createError])

  return (
    <View style={$container}>
      <TextField
        control={control}
        name="name"
        status={errors?.name ? "error" : null}
        error={errors?.name ? "errors.pleaseFill" : null}
        placeholderTx="createPersonalAccount.name"
      />
      <TextField
        control={control}
        name="birthdateYear"
        status={errors?.birthdateYear ? "error" : null}
        error={errors?.birthdateYear ? "errors.pleaseFill" : null}
        placeholderTx="createPersonalAccount.dateOfBirth"
      />
      <View style={$dropdownGenderList}>
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

      <View style={$dropdownList}>
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
        status={errors?.phoneNumber ? "error" : null}
        errorText={
          errors?.phoneNumber
            ? `${11 - phoneNumber?.length} ${I18n.translate("errors.phone")}`
            : null
        }
        placeholderTx="createPersonalAccount.mobileNumber"
        keyboardType="numeric"
      />

      <Button
        loading={isCreating}
        tx="common.continue"
        style={$continueBtn}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraLarge,
  gap: 20,
}

const $continueBtn: ViewStyle = {
  marginTop: spacing.large,
}

const $dropdownGenderList: ViewStyle = {
  zIndex: 999,
}

const $dropdownList: ViewStyle = {
  zIndex: 899,
}
