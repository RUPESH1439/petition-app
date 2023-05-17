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
  governorate: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  showName: z.boolean(),
})

interface CreatePetitionScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreatePetition">> {}

export const CreatePetitionScreen: FC<CreatePetitionScreenProps> = observer(
  function CreatePetitionScreen() {
    const {
      control,
      // handleSubmit,
      // watch,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        governorate: "",
        category: "",
        title: "",
        description: "",
        image: "",
        showName: false,
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
    const [selectedCategory, setSelectedCategory] = React.useState("")

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
    const [selectedGovernorate, setSelectedGovernorate] = React.useState("")

    React.useEffect(() => {
      setGovernorates([..._governorates])
      setCategories([..._categories])
    }, [isRTL])
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

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
                setSelectedGovernorate(value)
                setValue("governorate", value)
              }}
              value={selectedGovernorate}
            />
          </View>
          <View style={$categoryContainer}>
            <Dropdown
              items={categories}
              setItems={setCategories}
              value={selectedCategory}
              placeholderTx={"createPetition.category"}
              onChange={(value) => {
                setSelectedCategory(value)
                setValue("category", value)
              }}
            />
          </View>

          <TextField
            control={control}
            name="title"
            placeholderTx="createPetition.title"
            status={errors?.title ? "error" : null}
            error={errors?.title ? "auth.signIn" : null}
          />
          <TextField
            control={control}
            name="description"
            placeholderTx="createPetition.description"
            numberOfLines={5}
            style={{ height: moderateVerticalScale(145) }}
            multiline
            status={errors?.description ? "error" : null}
            error={errors?.description ? "auth.signIn" : null}
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
          />

          <Button
            tx="createPetition.publish"
            onPress={() => {
              navigation.navigate("Thankyou")
            }}
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
