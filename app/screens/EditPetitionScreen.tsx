import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Dropdown, ImagePicker, Screen, ScreenHeader, TextField } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { spacing } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { ScrollView } from "react-native-gesture-handler"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useUser from "app/hooks/userUser"
import { ShowHideName } from "app/components/ShowHideName"
import useUpdatePetition from "app/hooks/api/useUpdatePetition"
import useFormattedGovernorates from "app/hooks/useFormattedGovernorates"
import useFormattedPetitionCategories from "app/hooks/useFormattedPetitionCategories"

const schema = z.object({
  governorate: z.number(),
  category: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().nullish(),
  showName: z.boolean(),
})

type ISchema = z.infer<typeof schema>

interface EditPetitionScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"EditPetition">> {}

export const EditPetitionScreen: FC<EditPetitionScreenProps> = observer(
  function EditPetitionScreen() {
    const {
      control,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        governorate: null,
        category: null,
        title: null,
        description: null,
        image: null,
        showName: null,
      },
    })
    const { user } = useUser()

    const route = useRoute<RouteProp<AppStackParamList, "EditPetition">>()
    const {
      category: __category,
      governorate: __governorate,
      title: __title,
      description: __description,
      image: __image,
      hideName: __hideName,
    } = route?.params?.petitionData?.attributes ?? {}

    const { governorates, setGovernorates } = useFormattedGovernorates()
    const { categories, setCategories } = useFormattedPetitionCategories()

    const { updatePetition, isUpdatingPetition, isSuccess } = useUpdatePetition()
    const governorate = watch("governorate")
    const category = watch("category")
    const showName = watch("showName")

    const isError =
      errors?.description ||
      errors?.title ||
      (errors?.governorate && !governorate) ||
      (errors?.category && !category) ||
      (errors?.showName && showName === null)

    const onSubmit = async (data: ISchema) => {
      await updatePetition({
        id: route?.params?.petitionData?.id,
        title: data?.title,
        creator: user?.owner?.id,
        description: data?.description,
        category: data?.category,
        hideName: !data?.showName,
        governorate: data?.governorate,
      })
    }

    useEffect(() => {
      if (isSuccess) {
        navigation.goBack()
      }
    }, [isSuccess])

    useEffect(() => {
      setValue("category", __category?.data?.id)
      setValue("governorate", __governorate?.data?.id)
      setValue("title", __title)
      setValue("description", __description)
      setValue("showName", !__hideName)
    }, [route?.params?.petitionData])
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="editPetition.header"
          presets="backAndTitle"
          onButtonPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={$body} showsVerticalScrollIndicator={false}>
          <View style={$governorateContainer}>
            <Dropdown
              items={governorates}
              setItems={setGovernorates}
              placeholderTx={"editPetition.governorate"}
              onChange={(value) => {
                if (value !== governorate) {
                  setValue("governorate", value)
                }
              }}
              value={__governorate?.data?.id}
              error={!governorate && errors?.governorate ? "errors.pleaseChoose" : null}
            />
          </View>
          <View style={$categoryContainer}>
            <Dropdown
              items={categories}
              setItems={setCategories}
              placeholderTx={"editPetition.category"}
              onChange={(value) => {
                if (value !== category) {
                  setValue("category", value)
                }
              }}
              value={__category?.data?.id}
              error={!category && errors?.category ? "errors.pleaseChoose" : null}
            />
          </View>

          <TextField
            control={control}
            name="title"
            placeholderTx="editPetition.title"
            status={errors?.title ? "error" : null}
            error={errors?.title ? "errors.pleaseFill" : null}
          />
          <TextField
            control={control}
            name="description"
            placeholderTx="editPetition.description"
            numberOfLines={5}
            style={{ height: moderateVerticalScale(145) }}
            multiline
            status={errors?.description ? "error" : null}
            error={errors?.description ? "errors.pleaseFill" : null}
          />

          <ImagePicker
            style={$image}
            onSelectImage={(image) => {
              setValue("image", image?.assets?.[0]?.uri)
            }}
            iconSize={moderateVerticalScale(38)}
            labelX="editPetition.imageOptional"
          />

          <ShowHideName
            onChange={(_showName) => {
              if (showName !== _showName) {
                setValue("showName", _showName)
              }
            }}
            value={!__hideName}
            error={errors?.showName ? "errors.pleaseChoose" : null}
          />
          <Button
            preset={isError ? "reversed" : "default"}
            tx="editPetition.publish"
            onPress={handleSubmit(onSubmit)}
            disabled={!!isError}
            loading={isUpdatingPetition}
          />
        </ScrollView>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $body: ViewStyle = {
  gap: moderateVerticalScale(18),
  paddingTop: moderateVerticalScale(38),
  paddingHorizontal: spacing.medium,
  paddingBottom: "20%",
}

const $image: ViewStyle = {
  minHeight: moderateVerticalScale(160),
  width: "50%",
}

const $governorateContainer: ViewStyle = {
  zIndex: 599,
}

const $categoryContainer: ViewStyle = {
  zIndex: 499,
}
