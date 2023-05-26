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
import { ShowHideName } from "./components/ShowHideName"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import usePetitionCategory from "app/hooks/api/usePetitionCategory"
import useGovernorate from "app/hooks/api/useGovernorate"
import useRTL from "app/hooks/useRTL"
import useCreatePetition from "app/hooks/api/useCreatePetition"
import useUser from "app/hooks/userUser"

const schema = z.object({
  governorate: z.number(),
  category: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().nullish(),
  showName: z.boolean(),
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
        image: null,
        showName: null,
      },
    })
    const { isRTL } = useRTL()
    const { user } = useUser()
    const { petitionCategoryData } = usePetitionCategory()
    const { governorateData } = useGovernorate()
    const { createPetition, isCreatingPetition, isSuccess } = useCreatePetition()
    const _categories = React.useMemo(
      () =>
        petitionCategoryData?.map(({ attributes, id }) => ({
          value: id,
          label: isRTL ? attributes?.arName : attributes?.enName,
        })) ?? [],
      [isRTL, petitionCategoryData],
    )
    const [categories, setCategories] = React.useState([])

    const _governorates = React.useMemo(
      () =>
        governorateData?.map(({ id, attributes }) => ({
          label: isRTL ? attributes?.arName : attributes?.enName,
          value: id,
        })) ?? [],
      [isRTL, governorateData],
    )
    const [governorates, setGovernorates] = React.useState(_governorates)

    React.useEffect(() => {
      setGovernorates([..._governorates])
      setCategories([..._categories])
    }, [isRTL])

    React.useEffect(() => {
      setCategories([..._categories])
    }, [_categories])

    React.useEffect(() => {
      setGovernorates([..._governorates])
    }, [_governorates])

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
      await createPetition({
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
            onSelectImage={(image) => {
              setValue("image", image?.assets?.[0]?.uri)
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
            loading={isCreatingPetition}
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
