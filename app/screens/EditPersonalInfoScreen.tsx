import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Dropdown, Screen, ScreenHeader, TextField } from "app/components"
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
import { save } from "app/utils/storage"
import { STORAGE } from "app/constants/storage"
import useUpdateUser from "app/hooks/api/useUpdateUser"
import formatUserData from "app/utils/api/formatUserData"
import I18n from "i18n-js"
import useUpdateOwner from "app/hooks/api/useUpdateOwner"
import { PersonalUser } from "app/hooks/api/interface"

// import { useStores } from "app/models"

const schema = z.object({
  name: z.string().min(1),
  birthdateYear: z.string().length(4),
  mobileNumber: z.string().length(11),
  gender: z.number(),
  governorate: z.number(),
})

interface EditPersonalInfoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditPersonalInfo">> {}

export const EditPersonalInfoScreen: FC<EditPersonalInfoScreenProps> = observer(
  function EditPersonalInfoScreen() {
    const { isRTL } = useRTL()
    const { user, setUser } = useUser()
    const { isUpdating, updateUser } = useUpdateUser()
    const { updateOwner } = useUpdateOwner()
    const {
      name,
      birthdateYear,
      gender: __gender,
      governorate,
      owner,
    } = (user ?? {}) as PersonalUser
    console.log("user", user)
    const { genderData } = useGender()
    const { governorateData } = useGovernorate()

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
        mobileNumber: null,
        gender: null,
        governorate: null,
      },
    })
    const mobileNumber = watch("mobileNumber")
    const onSubmit = async (data) => {
      await updateOwner({ phoneNumber: mobileNumber })
      const response = await updateUser(data)
      const formatedUser = formatUserData(response)
      setUser(formatedUser)
      await save(STORAGE.USER, formatedUser)
      navigation.goBack()
    }

    const _cities = useMemo(
      () =>
        governorateData?.map(({ id, attributes }) => ({
          label: isRTL ? attributes?.arName : attributes?.enName,
          value: id,
        })) ?? [],
      [isRTL, governorateData],
    )

    const _genders = useMemo(
      () =>
        genderData?.map(({ id, attributes }) => ({
          label: isRTL ? attributes?.arType : attributes?.enType,
          value: id,
        })) ?? [],
      [isRTL, genderData],
    )

    const [cities, setCities] = React.useState(_cities)
    const [genders, setGenders] = React.useState(_genders)

    React.useEffect(() => {
      setCities([..._cities])
      setGenders([..._genders])
    }, [isRTL])

    React.useEffect(() => {
      setGenders([..._genders])
    }, [_genders])

    React.useEffect(() => {
      setCities([..._cities])
    }, [_cities])

    React.useEffect(() => {
      if (name) {
        setValue("name", name)
      }
      if (birthdateYear) {
        setValue("birthdateYear", birthdateYear)
      }
      if (owner?.phoneNumber) {
        setValue("mobileNumber", owner?.phoneNumber)
      }
    }, [user?.id])

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
              value={__gender?.id}
              placeholderTx="createPersonalAccount.gender"
              onChange={(value) => {
                setValue("gender", value)
              }}
            />
          </View>

          <View style={$dropdownList}>
            <Dropdown
              items={cities}
              value={governorate?.id}
              setItems={setCities}
              placeholderTx="createPersonalAccount.governorate"
              onChange={(value) => {
                setValue("governorate", value)
              }}
            />
          </View>

          <TextField
            control={control}
            name="mobileNumber"
            status={errors?.mobileNumber ? "error" : null}
            errorText={
              errors?.mobileNumber
                ? `${11 - mobileNumber?.length} ${I18n.translate("errors.phone")}`
                : null
            }
            placeholderTx="createPersonalAccount.mobileNumber"
            keyboardType="numeric"
          />

          <Button
            loading={isUpdating}
            tx="common.change"
            style={$continueBtn}
            onPress={handleSubmit(onSubmit)}
          />
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
