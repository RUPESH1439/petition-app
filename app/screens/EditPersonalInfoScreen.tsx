import React, { FC } from "react"
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
        dateOfBirth: null,
        mobileNumber: "",
        gender: null,
        city: null,
      },
    })
    const onSubmit = (data) => console.log(data)
    const mockCities = [
      { id: "iraq", nameAr: "العراق", nameEn: "Iraq" },
      { id: "bagdad", nameAr: "بغداد", nameEn: "Baghdad" },
    ]

    const mockGenders = [
      { id: "male", nameAr: "ذكر", nameEn: "male" },
      { id: "female", nameAr: "بغداد", nameEn: "female" },
    ]

    const _cities = mockCities.map(({ id, nameAr, nameEn }) => ({
      label: isRTL ? nameAr : nameEn,
      value: id,
    }))

    const _gender = mockGenders.map(({ id, nameAr, nameEn }) => ({
      label: isRTL ? nameAr : nameEn,
      value: id,
    }))

    const [cities, setCities] = React.useState(_cities)
    const [gender, setGender] = React.useState(_gender)

    const dateOfBirth = watch("dateOfBirth")
    // const city = watch("city")

    React.useEffect(() => {
      setCities([..._cities])
      setGender([..._gender])
    }, [isRTL])

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
          <Datepicker
            date={dateOfBirth}
            placeholderTx="createPersonalAccount.dateOfBirth"
            onChange={(date) => {
              setValue("dateOfBirth", date)
            }}
          />
          <View style={$dropdownGenderList}>
            <Dropdown
              items={gender}
              setItems={setGender}
              placeholderTx="createPersonalAccount.gender"
              onChange={(value) => {
                setValue("gender", value)
              }}
            />
          </View>

          <View style={$dropdownList}>
            <Dropdown
              items={cities}
              setItems={setCities}
              placeholderTx="createPersonalAccount.governorate"
              onChange={(value) => {
                setValue("city", value)
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
