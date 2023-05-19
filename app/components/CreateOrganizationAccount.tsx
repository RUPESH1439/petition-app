import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { useForm } from "react-hook-form"
import { TextField } from "./TextField"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./Button"
import { ScrollView } from "react-native-gesture-handler"
import useRTL from "app/hooks/useRTL"
import I18n from "i18n-js"
import { Dropdown } from "./Dropdown"
import { ImagePicker } from "./ImagePicker"
import { moderateVerticalScale } from "app/utils/scaling"

const schema = z.object({
  organizationNameArabic: z.string(),
  organizationNameEnglish: z.string(),
  nearestLandMark: z.string(),
  ceoName: z.string(),
  ceoPhone: z.string(),
  organizationPhone: z.string(),
  organizationSocialMediaLinks: z.array(z.string()),
  establishedDate: z.date(),
  city: z.string(),
})
export interface CreateOrganizationAccountProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreateOrganizationAccount = observer(function CreateOrganizationAccount(
  props: CreateOrganizationAccountProps,
) {
  const { style } = props
  const $styles = [$container, style]

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      organizationNameEnglish: "",
      organizationNameArabic: "",
      city: "",
      ceoName: "",
      ceoPhone: "",
      organizationPhone: "",
      organizationSocialMediaLinks: [],
      nearestLandMark: "",
      establisedDate: null,
    },
  })

  const onSubmit = (data) => console.log(data)

  const { isRTL } = useRTL()

  const mockSocialMediaLinks = [
    { id: "facebook", nameAr: "العراق", nameEn: "Facebook" },
    { id: "Instagram", nameAr: "العراق", nameEn: "Instagram" },
    { id: "Website", nameAr: "العراق", nameEn: "Website" },
  ]

  const mockCities = [
    { id: "iraq", nameAr: "العراق", nameEn: "Iraq" },
    { id: "bagdad", nameAr: "بغداد", nameEn: "Baghdad" },
    { id: "test", nameAr: "بغداد", nameEn: "Test" },
  ]

  const _cities = mockCities.map(({ id, nameAr, nameEn }) => ({
    label: isRTL ? nameAr : nameEn,
    value: id,
  }))

  const [cities, setCities] = React.useState(_cities)
  const city = watch("city")

  React.useEffect(() => {
    setCities([..._cities])
  }, [isRTL])

  return (
    <View style={$styles}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
        <Text tx="createOrganizationAccount.header" style={$header} />
        <ImagePicker
          titleX="createOrganizationAccount.logo"
          style={$logo}
          onSelectImage={(image) => {
            console.log("image", image)
          }}
        />
        <TextField
          control={control}
          name="organizationNameArabic"
          placeholderTx="createOrganizationAccount.organizationNameArabic"
          status={errors?.organizationNameArabic ? "error" : null}
          error={errors?.organizationNameArabic ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <TextField
          control={control}
          name="organizationNameEnglish"
          placeholderTx="createOrganizationAccount.organizationNameEnglish"
          status={errors?.organizationNameEnglish ? "error" : null}
          error={errors?.organizationNameEnglish ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <View style={$establishedContainer}>
          <View style={$flexOne}>
            <TextField
              control={control}
              name="establisedDate"
              placeholderTx="createOrganizationAccount.establishedDate"
              status={errors?.establisedDate ? "error" : null}
              error={errors?.establisedDate ? "auth.signIn" : null}
              containerStyle={$textInput}
            />

            <TextField
              control={control}
              name="organizationNameEnglish"
              placeholderTx="createOrganizationAccount.permitNumber"
              status={errors?.organizationNameEnglish ? "error" : null}
              error={errors?.organizationNameEnglish ? "auth.signIn" : null}
              containerStyle={$textInput}
            />
          </View>
          <View style={[$flexOne, $imagePicker]}>
            <ImagePicker
              titleX="createOrganizationAccount.permitImage"
              onSelectImage={(image) => {
                console.log("image", image)
              }}
            />
          </View>
        </View>

        <Dropdown
          items={cities}
          setItems={setCities}
          placeholderTx={"createOrganizationAccount.addressCity"}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={(value) => {
            setValue("city", value)
          }}
          style={$address}
          value={city}
          dropDownContainerStyle={{ minHeight: cities.length * 80 }}
        />

        <TextField
          control={control}
          name="nearestLandMark"
          placeholderTx="createOrganizationAccount.addressNearestLandmark"
          status={errors?.nearestLandMark ? "error" : null}
          error={errors?.nearestLandMark ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <Text tx="createOrganizationAccount.ceoInfo" style={$header} />
        <TextField
          control={control}
          name="ceoName"
          placeholderTx="createOrganizationAccount.name"
          status={errors?.ceoName ? "error" : null}
          error={errors?.ceoName ? "auth.signIn" : null}
          containerStyle={$textInput}
        />
        <TextField
          control={control}
          name="ceoPhone"
          placeholderTx="createOrganizationAccount.phoeNumber"
          status={errors?.ceoPhone ? "error" : null}
          error={errors?.ceoPhone ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <Text tx="createOrganizationAccount.contactInfo" style={$header} />
        <TextField
          control={control}
          name="organizationPhone"
          placeholderTx="createOrganizationAccount.organizationPhoneNumber"
          status={errors?.organizationPhone ? "error" : null}
          error={errors?.organizationPhone ? "auth.signIn" : null}
          containerStyle={$textInput}
          keyboardType="phone-pad"
        />

        {mockSocialMediaLinks.map(({ id, nameAr, nameEn }) => (
          <TextField
            key={id}
            placeholder={`${isRTL ? nameAr : nameEn} ${I18n.t(
              "createOrganizationAccount.linkOptional",
            )}`}
            status={errors?.ceoPhone ? "error" : null}
            error={errors?.ceoPhone ? "auth.signIn" : null}
            containerStyle={$textInput}
          />
        ))}

        <Button tx="common.continue" onPress={handleSubmit(onSubmit)} style={$continue} />
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.medium,
  paddingBottom: "30%",
}

const $header: TextStyle = {
  fontFamily: typography.primary.extraBold,
  fontSize: moderateVerticalScale(18),
  color: colors.palette.neutral100,
  marginBottom: spacing.medium,
  marginTop: spacing.medium,
  fontWeight: "900",
  lineHeight: moderateVerticalScale(31),
}

const $logo: ViewStyle = { height: 130, alignSelf: "center", marginBottom: spacing.medium }

const $address: ViewStyle = {
  marginBottom: spacing.medium,
}

const $textInput: ViewStyle = {
  marginBottom: spacing.extraMedium,
}

const $establishedContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $flexOne: ViewStyle = {
  flex: 1,
}

const $imagePicker: ViewStyle = {
  paddingBottom: spacing.medium,
  alignItems: "flex-end",
}

const $continue: ViewStyle = {
  marginTop: moderateVerticalScale(20),
}
