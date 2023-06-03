import * as React from "react"
import { Alert, StyleProp, TextStyle, View, ViewStyle } from "react-native"
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
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import useCreateUser from "app/hooks/api/useCreateUser"
import useFormattedGovernorates from "app/hooks/useFormattedGovernorates"
import { TxKeyPath } from "app/i18n"
import useUploadMedia from "app/hooks/api/useUploadMedia"
import NetInfo from "@react-native-community/netinfo"

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
  logo: z.object({
    uri: z.string(),
    type: z.string(),
    name: z.string(),
  }),
  permitImage: z.object({
    uri: z.string(),
    type: z.string(),
    name: z.string(),
  }),
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
  const { isCreating, createUser, isSuccess, createError } = useCreateUser("organization")
  const { uploadMedia, isUploadingMedia } = useUploadMedia()

  const { governorates, setGovernorates } = useFormattedGovernorates()
  const $styles = [$container, style]

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
      organizationPhone: "",
      organizationSocialMediaLinks: [],
      nearestLandmark: null,
      EstablishedYear: null,
      permitNumber: null,
      facebookLink: null,
      instagramLink: null,
      websiteLink: null,
      logo: null,
      permitImage: null,
    },
  })
  const governorate = watch("governorate")

  const onSubmit = async (data) => {
    const { logo, permitImage } = data
    const netInfo = await NetInfo.fetch()

    try {
      let logoId = null
      let permitImageId = null
      const logoImageResponse = await uploadMedia({
        uri: logo?.uri,
        name: logo?.name,
        type: logo?.type,
      })
      logoId = logoImageResponse.data?.[0]?.id

      const permitImageResp = await uploadMedia({
        uri: permitImage?.uri,
        name: permitImage?.name,
        type: permitImage?.type,
      })
      permitImageId = permitImageResp.data?.[0]?.id

      createUser({
        ...data,
        logo: logoId,
        permitImage: permitImageId,
        ip: netInfo?.details?.ipAddress,
      })
    } catch (err) {}
  }

  const { isRTL } = useRTL()

  const socialMediaLinks: {
    id: string
    nameAr: string
    nameEn: string
    name: string
    error: TxKeyPath
  }[] = React.useMemo(
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
    [],
  )

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

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  return (
    <View style={$styles}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text tx="createOrganizationAccount.header" style={$header} />
        <ImagePicker
          titleX="createOrganizationAccount.logo"
          style={$logo}
          onSelectImage={async (image) => {
            setValue("logo", {
              uri: image?.uri,
              name: image?.fileName,
              type: image?.type,
            })
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
              keyboardType="phone-pad"
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
              onSelectImage={async (image) => {
                setValue("permitImage", {
                  uri: image?.uri,
                  name: image?.fileName,
                  type: image?.type,
                })
              }}
            />
          </View>
        </View>

        <Dropdown
          items={governorates}
          setItems={setGovernorates}
          placeholderTx={"createOrganizationAccount.addressCity"}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={(value) => {
            setValue("governorate", value)
          }}
          dropDownContainerStyle={{ minHeight: governorates.length * 80 }}
          style={$address}
          error={!governorate && errors?.governorate ? "errors.pleaseChoose" : null}
        />

        <TextField
          control={control}
          name="nearestLandmark"
          placeholderTx="createOrganizationAccount.addressNearestLandmark"
          status={errors?.nearestLandmark ? "error" : null}
          error={errors?.nearestLandmark ? "errors.pleaseChoose" : null}
          containerStyle={$textInput}
        />

        <Text tx="createOrganizationAccount.ceoInfo" style={$header} />
        <TextField
          control={control}
          name="CEOName"
          placeholderTx="createOrganizationAccount.name"
          status={errors?.CEOName ? "error" : null}
          error={errors?.CEOName ? "errors.pleaseFill" : null}
          containerStyle={$textInput}
        />
        <TextField
          control={control}
          name="ceoPhone"
          keyboardType="phone-pad"
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
          loading={isCreating || isUploadingMedia}
          disabled={isCreating || isUploadingMedia}
          tx="common.continue"
          onPress={handleSubmit(onSubmit)}
          style={$continue}
        />
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingTop: moderateVerticalScale(30),
  paddingBottom: "30%",
}

const $header: TextStyle = {
  fontFamily: typography.primary.extraBold,
  fontSize: moderateVerticalScale(18),
  color: colors.palette.neutral100,
  marginBottom: spacing.medium,
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
