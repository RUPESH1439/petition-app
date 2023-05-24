import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Datepicker, Dropdown, Screen, ScreenHeader, TextField } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import useRTL from "app/hooks/useRTL"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { spacing } from "app/theme"
import useUser from "app/hooks/userUser"
import useGender from "app/hooks/api/useGender"
import useGovernorate from "app/hooks/api/useGovernorate"

// import { useStores } from "app/models"

const schema = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  mobileNumber: z.string(),
  gender: z.string(),
  city: z.string(),
})

interface EditPersonalInfoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditPersonalInfo">> {}

export const EditPersonalInfoScreen: FC<EditPersonalInfoScreenProps> = observer(
  function EditPersonalInfoScreen() {
    const { isRTL } = useRTL()
    const { user } = useUser()
    const { genderData } = useGender()
    const { governorateData } = useGovernorate()

    const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        name: "",
        dateOfBirth: "",
        mobileNumber: "",
        gender: null,
        city: null,
      },
    })
    const onSubmit = (data) => console.log(data)

    const _cities = governorateData?.map(({ id, attributes }) => ({
      label: isRTL ? attributes?.arName : attributes?.enName,
      value: id,
    }))

    const _genders = genderData?.map(({ id, attributes }) => ({
      label: isRTL ? attributes?.arType : attributes?.enType,
      value: id,
    }))

    const [cities, setCities] = React.useState(_cities)
    const [genders, setGenders] = React.useState(_genders)
    const [gender, setGender] = useState<number | null | string>(null)
    const [city, setCity] = useState<number | null | string>(null)

    React.useEffect(() => {
      setCities([..._cities])
      setGenders([..._genders])
    }, [isRTL])

    React.useEffect(() => {
      const { name, birthdateYear, gender: __gender, governorate, owner } = user ?? {}
      if (name) {
        setValue("name", name)
      }
      if (birthdateYear) {
        setValue("dateOfBirth", birthdateYear)
      }
      if (owner?.phoneNumber) {
        setValue("mobileNumber", owner?.phoneNumber)
      }
    }, [user?.id, gender])

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="accountInfo.personalInfo"
          presets="backAndTitle"
          buttonTx="common.change"
          onButtonPress={() => navigation.goBack()}
        />
        <View style={$container}>
          <TextField
            control={control}
            name="name"
            status={errors?.name ? "error" : null}
            error={errors?.name ? "auth.signIn" : null}
            placeholderTx="createPersonalAccount.name"
          />
          <TextField
            control={control}
            name="dateOfBirth"
            status={errors?.dateOfBirth ? "error" : null}
            error={errors?.dateOfBirth ? "auth.signIn" : null}
            placeholderTx="createPersonalAccount.dateOfBirth"
          />
          <View style={$dropdownGenderList}>
            <Dropdown
              items={genders}
              setItems={setGenders}
              value={gender}
              placeholderTx="createPersonalAccount.gender"
              onChange={(value) => {
                setValue("gender", value)
                setGender(value)
              }}
            />
          </View>

          <View style={$dropdownList}>
            <Dropdown
              items={cities}
              value={city}
              setItems={setCities}
              placeholderTx="createPersonalAccount.governorate"
              onChange={(value) => {
                setValue("city", value)
                setCity(value)
              }}
            />
          </View>

          <TextField
            control={control}
            name="mobileNumber"
            status={errors?.mobileNumber ? "error" : null}
            error={errors?.mobileNumber ? "auth.signIn" : null}
            placeholderTx="createPersonalAccount.mobileNumber"
            keyboardType="numeric"
          />

          <Button tx="common.change" style={$continueBtn} onPress={handleSubmit(onSubmit)} />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
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
