import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Button, Dropdown, ImagePicker, Screen, ScreenHeader, TextField } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { spacing } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import { isRTL } from "app/i18n"
import { ScrollView } from "react-native-gesture-handler"
import { ShowHideName } from "./components/ShowHideName"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  governorate: z.string().min(1),
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().nullish(),
  showName: z.boolean(),
})

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
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        governorate: undefined,
        category: undefined,
        title: undefined,
        description: undefined,
        image: undefined,
        showName: undefined,
      },
    })

    const mockCategories = [
      { id: "iraq", nameAr: "العراق", nameEn: "Iraq" },
      { id: "bagdad", nameAr: "بغداد", nameEn: "Baghdad" },
    ]

    const _categories = mockCategories.map(({ id, nameAr, nameEn }) => ({
      label: isRTL ? nameAr : nameEn,
      value: id,
    }))

    const [categories, setCategories] = React.useState(_categories)

    const mockGovernorates = [
      { id: "iraq", nameAr: "العراق", nameEn: "Iraq" },
      { id: "bagdad", nameAr: "بغداد", nameEn: "Baghdad" },
      { id: "karbala", nameAr: "بغداد", nameEn: "Karbala" },
    ]

    const _governorates = mockGovernorates.map(({ id, nameAr, nameEn }) => ({
      label: isRTL ? nameAr : nameEn,
      value: id,
    }))

    const [governorates, setGovernorates] = React.useState(_governorates)

    React.useEffect(() => {
      setGovernorates([..._governorates])
      setCategories([..._categories])
    }, [isRTL])

    const governorate = watch("governorate")
    const category = watch("category")
    const showName = watch("showName")

    const isError =
      errors?.description ||
      errors?.title ||
      (errors?.governorate && !governorate) ||
      (errors?.category && !category) ||
      (errors?.showName && showName === null)

    const onSubmit = (data) => {
      console.log(data)
      navigation.navigate("Thankyou")
    }

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
                setValue("governorate", value)
              }}
              value={governorate}
              error={!governorate && errors?.governorate ? "errors.pleaseChoose" : null}
            />
          </View>
          <View style={$categoryContainer}>
            <Dropdown
              items={categories}
              setItems={setCategories}
              value={category}
              placeholderTx={"createPetition.category"}
              onChange={(value) => {
                setValue("category", value)
              }}
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
            onChange={(showName) => {
              setValue("showName", showName)
            }}
            error={errors?.showName ? "errors.pleaseChoose" : null}
          />
          <Button
            preset={isError ? "reversed" : "default"}
            tx="createPetition.publish"
            onPress={handleSubmit(onSubmit)}
            disabled={!!isError}
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
