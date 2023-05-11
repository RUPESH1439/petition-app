import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"
import { TextField } from "./TextField"
import { Button } from "./Button"
import { Dropdown } from "./Dropdown"
import useRTL from "app/hooks/useRTL"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  mobileNumber: z.string(),
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
  const { isRTL } = useRTL()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      mobileNumber: "",
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

  React.useEffect(() => {
    setCities([..._cities])
    setGender([..._gender])
  }, [isRTL])

  return (
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
        keyboardType="numeric"
      />
      <View style={$dropdownGenderList}>
        <Dropdown
          items={gender}
          setItems={setGender}
          placeholderTx="createPersonalAccount.gender"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
        />
      </View>

      <View style={$dropdownList}>
        <Dropdown
          items={cities}
          setItems={setCities}
          placeholderTx="createPersonalAccount.governorate"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
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

      <Button tx="common.continue" style={$continueBtn} onPress={handleSubmit(onSubmit)} />
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
