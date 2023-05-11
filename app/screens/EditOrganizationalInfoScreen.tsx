import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import {
  Button,
  Datepicker,
  Dropdown,
  ImagePicker,
  Screen,
  ScreenHeader,
  Text,
  TextField,
} from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useRTL from "app/hooks/useRTL"
import { ScrollView } from "react-native-gesture-handler"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import I18n from "i18n-js"
// import { useStores } from "app/models"

interface EditOrganizationalInfoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditOrganizationalInfo">> {}

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

export const EditOrganizationalInfoScreen: FC<EditOrganizationalInfoScreenProps> = observer(
  function EditOrganizationalInfoScreen() {
    const {
      control,
      handleSubmit,
      watch,
      setValue,
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
    ]

    const _cities = mockCities.map(({ id, nameAr, nameEn }) => ({
      label: isRTL ? nameAr : nameEn,
      value: id,
    }))

    const [cities, setCities] = React.useState(_cities)

    const establisedDate = watch("establisedDate")

    React.useEffect(() => {
      setCities([..._cities])
    }, [isRTL])

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="accountInfo.organizationInfo"
          presets="backAndTitle"
          onButtonPress={() => navigation.goBack()}
        />
        <View style={$container}>
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
                <Datepicker
                  style={$textInput}
                  date={establisedDate}
                  placeholderTx="createOrganizationAccount.establishedDate"
                  onChange={(date) => {
                    setValue("establisedDate", date)
                  }}
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

            <Button tx="common.change" onPress={handleSubmit(onSubmit)} style={$continue} />
          </ScrollView>
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
