import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
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
import { View } from "react-native"
import { TabView } from "react-native-tab-view"
import { colors, spacing, typography } from "app/theme"
import { moderateVerticalScale, verticalScale } from "app/utils/scaling"
import { isRTL } from "app/i18n"
// import { useStores } from "app/models"

interface CreatePetitionScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"CreatePetition">> {}

export const CreatePetitionScreen: FC<CreatePetitionScreenProps> = observer(
  function CreatePetitionScreen() {
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
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <ScreenHeader
          tx="createPetition.title"
          presets="backAndTitle"
          onButtonPress={() => navigation.goBack()}
        />
        <View style={$body}>
          <View style={{ zIndex: 999 }}>
            <Dropdown
              items={governorates}
              setItems={setGovernorates}
              placeholderTx={"createPetition.governorate"}
              onChange={(value) => {
                setSelectedGovernorate(value)
              }}
              value={selectedGovernorate}
            />
          </View>
          <View style={{ zIndex: 499 }}>
            <Dropdown
              items={categories}
              setItems={setCategories}
              value={selectedCategory}
              placeholderTx={"createPetition.governorate"}
              // dropDownContainerStyle={{}}
              onChange={(value) => {
                setSelectedCategory(value)
              }}
            />
          </View>

          <TextField
            //control={control}
            name="organizationNameArabic"
            placeholderTx="createPetition.inputTitle"
            // status={errors?.organizationNameArabic ? "error" : null}
            // error={errors?.organizationNameArabic ? "auth.signIn" : null}
            // containerStyle={$textInput}
          />
          <TextField
            // control={control}
            name="organizationNameEnglish"
            placeholderTx="createPetition.description"
            // status={errors?.organizationNameEnglish ? "error" : null}
            // error={errors?.organizationNameEnglish ? "auth.signIn" : null}
            //containerStyle={$textInput}
          />

          {/* <View style={{ borderWidth: 1, height: 200 }}> */}
          <ImagePicker
            titleX="createOrganizationAccount.logo"
            style={$logo}
            onSelectImage={(image) => {
              console.log("image", image)
            }}
          />
          {/* </View> */}

          <View>
            <Text>checkbox</Text>
          </View>

          <Button tx="common.continue" />
        </View>
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
  paddingHorizontal: moderateVerticalScale(18),
}

const $dropdown = (isDropdownActive: boolean): ViewStyle => ({
  backgroundColor: isDropdownActive ? colors.palette.primary200 : colors.palette.neutral50,
})

const $dropdownPlaceholderStyle = (isDropdownActive: boolean): TextStyle => ({
  color: isDropdownActive ? colors.palette.neutral100 : colors.palette.neutral150,
})

const $logo: ViewStyle = {
  minHeight: 130,
  alignSelf: "center",
  marginBottom: spacing.medium,
}
