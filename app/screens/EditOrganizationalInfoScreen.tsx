import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import {
  Button,
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
import useUser from "app/hooks/userUser"
import useGovernorate from "app/hooks/api/useGovernorate"
import { OrganizationUser } from "app/hooks/api/interface"
import useUpdateUser from "app/hooks/api/useUpdateUser"
import useUpdateOwner from "app/hooks/api/useUpdateOwner"
import formatUserData from "app/utils/api/formatUserData"
import { save } from "app/utils/storage"
import { STORAGE } from "app/constants/storage"
import { TxKeyPath } from "app/i18n"

interface EditOrganizationalInfoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditOrganizationalInfo">> {}

const schema = z.object({
  arName: z
    .string()
    // eslint-disable-next-line no-useless-escape
    .regex(/^[\u0600-\u06FF\s!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/)
    .min(1),
  enName: z
    .string()
    // eslint-disable-next-line no-useless-escape
    .regex(/^[a-zA-Z\s!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/)
    .min(1),
  nearestLandmark: z.string().min(1),
  CEOName: z.string().min(1),
  ceoPhone: z.string().length(11),
  organizationPhone: z.string().length(11),
  organizationSocialMediaLinks: z.array(z.string()),
  EstablishedYear: z.string().length(4),
  governorate: z.number(),
  facebookLink: z
    .string()
    .regex(/^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:[\w.]+\/?)*$/)
    .nullable(),
  instagramLink: z
    .string()
    .regex(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[\w.]+\/?)*$/)
    .nullable(),
  websiteLink: z
    .string()
    .regex(/^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/)
    .nullable(),
  permitNumber: z.string().min(1),
})

export const EditOrganizationalInfoScreen: FC<EditOrganizationalInfoScreenProps> = observer(
  function EditOrganizationalInfoScreen() {
    const { user, setUser } = useUser()
    const { isUpdating, updateUser } = useUpdateUser()
    const { updateOwner } = useUpdateOwner()
    const { governorateData } = useGovernorate()
    const {
      arName,
      enName,
      EstablishedYear,
      permitNumber,
      nearestLandmark,
      CEOName,
      organizationPhone,
      governorate: __governorate,
      owner,
    } = (user ?? {}) as OrganizationUser
    const { facebookLink, instagramLink, websiteLink, phoneNumber } = owner
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        enName: null,
        arName: null,
        governorate: null,
        CEOName: null,
        ceoPhone: "",
        organizationPhone: null,
        organizationSocialMediaLinks: [],
        nearestLandmark: null,
        EstablishedYear: null,
        permitNumber: null,
        facebookLink: null,
        instagramLink: null,
        websiteLink: null,
      },
    })

    const onSubmit = async (data) => {
      await updateOwner({
        phoneNumber: watch("ceoPhone"),
        instagramLink: watch("instagramLink"),
        facebookLink: watch("facebookLink"),
        websiteLink: watch("websiteLink"),
      })
      const response = await updateUser(data)
      const formatedUser = formatUserData(response)

      setUser(formatedUser)
      await save(STORAGE.USER, formatedUser)
      navigation.goBack()
    }

    const { isRTL } = useRTL()

    const _cities = useMemo(
      () =>
        governorateData?.map(({ id, attributes }) => ({
          label: isRTL ? attributes?.arName : attributes?.enName,
          value: id,
        })) ?? [],
      [isRTL, governorateData],
    )

    const socialMediaLinks: {
      id: string
      nameAr: string
      nameEn: string
      name: string
      error: TxKeyPath
    }[] = useMemo(
      () => [
        {
          id: "facebook",
          nameAr: "العراق",
          nameEn: "Facebook",
          name: "facebookLink",
          error: "errors.facebookOnly",
        },
        {
          id: "Instagram",
          nameAr: "العراق",
          nameEn: "Instagram",
          name: "instagramLink",
          error: "errors.instagramOnly",
        },
        {
          id: "Website",
          nameAr: "العراق",
          nameEn: "Website",
          name: "websiteLink",
          error: "errors.websiteOnly",
        },
      ],
      [user?.id],
    )

    const [cities, setCities] = React.useState(_cities)
    React.useEffect(() => {
      setCities([..._cities])
    }, [isRTL])

    React.useEffect(() => {
      setCities([..._cities])
    }, [_cities])

    React.useEffect(() => {
      if (arName) {
        setValue("arName", arName)
      }
      if (enName) {
        setValue("enName", enName)
      }
      if (EstablishedYear) {
        setValue("EstablishedYear", EstablishedYear)
      }
      if (permitNumber) {
        setValue("permitNumber", permitNumber)
      }
      if (nearestLandmark) {
        setValue("nearestLandmark", nearestLandmark)
      }
      if (CEOName) {
        setValue("CEOName", CEOName)
      }
      if (phoneNumber) {
        setValue("ceoPhone", phoneNumber)
      }
      if (organizationPhone) {
        setValue("organizationPhone", organizationPhone)
      }
      if (facebookLink) {
        setValue("facebookLink", facebookLink)
      }
      if (instagramLink) {
        setValue("instagramLink", instagramLink)
      }
      if (websiteLink) {
        setValue("websiteLink", websiteLink)
      }
    }, [user?.id])

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
              name="arName"
              placeholderTx="createOrganizationAccount.organizationNameArabic"
              status={errors?.arName ? "error" : null}
              error={errors?.arName ? "errors.arabicOnly" : null}
              containerStyle={$textInput}
            />

            <TextField
              control={control}
              name="enName"
              placeholderTx="createOrganizationAccount.organizationNameEnglish"
              status={errors?.enName ? "error" : null}
              error={errors?.enName ? "errors.englishOnly" : null}
              containerStyle={$textInput}
            />

            <View style={$establishedContainer}>
              <View style={$flexOne}>
                <TextField
                  control={control}
                  name="EstablishedYear"
                  placeholderTx="createOrganizationAccount.establishedDate"
                  status={errors?.EstablishedYear ? "error" : null}
                  error={errors?.EstablishedYear ? "errors.pleaseFill" : null}
                  containerStyle={$textInput}
                />

                <TextField
                  control={control}
                  keyboardType="phone-pad"
                  name="permitNumber"
                  placeholderTx="createOrganizationAccount.permitNumber"
                  status={errors?.permitNumber ? "error" : null}
                  error={errors?.permitNumber ? "errors.numbersOnly" : null}
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
              value={__governorate?.id}
              placeholderTx={"createOrganizationAccount.addressCity"}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={(value) => {
                setValue("governorate", value)
              }}
              dropDownContainerStyle={{ minHeight: cities.length * 80 }}
              style={$address}
            />

            <TextField
              control={control}
              name="nearestLandmark"
              placeholderTx="createOrganizationAccount.addressNearestLandmark"
              status={errors?.nearestLandmark ? "error" : null}
              error={errors?.nearestLandmark ? "auth.signIn" : null}
              containerStyle={$textInput}
            />

            <Text tx="createOrganizationAccount.ceoInfo" style={$header} />
            <TextField
              control={control}
              name="CEOName"
              placeholderTx="createOrganizationAccount.name"
              status={errors?.CEOName ? "error" : null}
              error={errors?.CEOName ? "auth.signIn" : null}
              containerStyle={$textInput}
            />
            <TextField
              control={control}
              name="ceoPhone"
              placeholderTx="createOrganizationAccount.phoeNumber"
              status={errors?.ceoPhone ? "error" : null}
              errorText={
                errors?.ceoPhone
                  ? `${11 - watch("ceoPhone")?.length} ${I18n.translate("errors.phone")}`
                  : null
              }
              containerStyle={$textInput}
            />

            <Text tx="createOrganizationAccount.contactInfo" style={$header} />
            <TextField
              control={control}
              name="organizationPhone"
              placeholderTx="createOrganizationAccount.organizationPhoneNumber"
              status={errors?.organizationPhone ? "error" : null}
              errorText={
                errors?.organizationPhone
                  ? `${11 - watch("organizationPhone")?.length} ${I18n.translate("errors.phone")}`
                  : null
              }
              containerStyle={$textInput}
              keyboardType="phone-pad"
            />

            {socialMediaLinks.map(({ id, nameAr, nameEn, name, error }) => (
              <TextField
                key={id}
                control={control}
                name={name}
                placeholder={`${isRTL ? nameAr : nameEn} ${I18n.t(
                  "createOrganizationAccount.linkOptional",
                )}`}
                status={errors?.[name] ? "error" : null}
                error={errors?.[name] ? error : null}
                containerStyle={$textInput}
                autoCapitalize="none"
              />
            ))}

            <Button
              loading={isUpdating}
              disabled={isUpdating}
              tx="common.change"
              onPress={handleSubmit(onSubmit)}
              style={$continue}
            />
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
