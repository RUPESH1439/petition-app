import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Dropdown, ImagePicker, Screen, ScreenHeader, TextField } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { spacing } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { ScrollView } from "react-native-gesture-handler"
import { ShowHideName } from "../../components/ShowHideName"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useCreatePetition from "app/hooks/api/useCreatePetition"
import useUser from "app/hooks/userUser"
import useUploadMedia from "app/hooks/api/useUploadMedia"
import useFormattedGovernorates from "app/hooks/useFormattedGovernorates"
import useFormattedPetitionCategories from "app/hooks/useFormattedPetitionCategories"

const schema = z.object({
  governorate: z.number(),
  category: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  showName: z.boolean(),
  image: z
    .object({
      uri: z.string(),
      type: z.string(),
      name: z.string(),
    })
    .optional(),
})

type ISchema = z.infer<typeof schema>

interface CreatePetitionScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreatePetition">> {}

export const CreatePetitionScreen: FC<CreatePetitionScreenProps> = observer(
  function CreatePetitionScreen() {
    const {
      control,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
      reset,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        governorate: null,
        category: null,
        title: null,
        description: null,
        showName: null,
        image: undefined,
      },
    })
    const { uploadMedia, isUploadingMedia } = useUploadMedia()
    const { user } = useUser()

    const { createPetition, isCreatingPetition, isSuccess } = useCreatePetition()
    const { governorates, setGovernorates } = useFormattedGovernorates()
    const { categories, setCategories } = useFormattedPetitionCategories()

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
      const { image } = data
      try {
        let imageId = null
        if (image) {
          const resp = await uploadMedia({
            uri: image?.uri,
            name: image?.name,
            type: image?.type,
          })
          imageId = resp.data?.[0]?.id
        }

        await createPetition({
          title: data?.title,
          creator: user?.owner?.id,
          description: data?.description,
          category: data?.category,
          hideName: !data?.showName,
          governorate: data?.governorate,
          image: imageId,
        })
      } catch (err) {}
    }

    useEffect(() => {
      if (isSuccess) {
        reset()

        navigation.navigate("Thankyou")
      }
    }, [isSuccess])
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="createPetition.header"
          presets="backAndTitle"
          onButtonPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={$body} showsVerticalScrollIndicator={false}>
          <View style={$governorateContainer}>
            <Dropdown
              items={governorates}
              setItems={setGovernorates}
              placeholderTx={"createPetition.governorate"}
              onChange={(value) => {
                if (value !== governorate) {
                  setValue("governorate", value)
                }
              }}
              value={governorate}
              error={!governorate && errors?.governorate ? "errors.pleaseChoose" : null}
            />
          </View>
          <View style={$categoryContainer}>
            <Dropdown
              items={categories}
              setItems={setCategories}
              placeholderTx={"createPetition.category"}
              onChange={(value) => {
                if (value !== category) {
                  setValue("category", value)
                }
              }}
              value={category}
              error={!category && errors?.category ? "errors.pleaseChoose" : null}
            />
          </View>

          <TextField
            control={control}
            name="title"
            placeholderTx="createPetition.title"
            status={errors?.title ? "error" : null}
            error={errors?.title ? "errors.pleaseFill" : null}
          />
          <TextField
            control={control}
            name="description"
            placeholderTx="createPetition.description"
            numberOfLines={5}
            style={{ height: moderateVerticalScale(145) }}
            multiline
            status={errors?.description ? "error" : null}
            error={errors?.description ? "errors.pleaseFill" : null}
          />

          <ImagePicker
            style={$image}
            onSelectImage={async (image) => {
              setValue("image", {
                uri: image?.uri,
                name: image?.fileName,
                type: image?.type,
              })
            }}
            iconSize={moderateVerticalScale(38)}
            labelX="createPetition.imageOptional"
          />

          <ShowHideName
            onChange={(_showName) => {
              if (showName !== _showName) {
                setValue("showName", _showName)
              }
            }}
            value={showName}
            error={errors?.showName ? "errors.pleaseChoose" : null}
          />
          <Button
            preset={isError ? "reversed" : "default"}
            tx="createPetition.publish"
            onPress={handleSubmit(onSubmit)}
            disabled={!!isError}
            loading={isCreatingPetition || isUploadingMedia}
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
