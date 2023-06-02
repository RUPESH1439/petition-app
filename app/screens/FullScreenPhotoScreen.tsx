import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, ViewStyle, Pressable, ImageStyle, ActivityIndicator } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import AntDesign from "react-native-vector-icons/AntDesign"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { colors } from "app/theme"

interface FullScreenPhotoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"FullScreenPhoto">> {}

export const FullScreenPhotoScreen: FC<FullScreenPhotoScreenProps> = observer(
  function FullScreenPhotoScreen() {
    const [loading, setLoading] = React.useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    const route = useRoute<RouteProp<AppStackParamList, "FullScreenPhoto">>()
    const { imageUri } = route?.params ?? {}

    return (
      <Screen
        style={[$root, !!loading && $center]}
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
      >
        <Pressable
          style={$closeButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name={"close"} size={28} color={colors.palette.neutral50} />
        </Pressable>
        <Image
          source={{ uri: imageUri }}
          style={loading ? $imageLoading : $image}
          onLoadStart={() => {
            setLoading(true)
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
        {!!loading && <ActivityIndicator color={colors.palette.primary100} size="large" />}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $center: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $closeButton: ViewStyle = {
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 9999,
}

const $image: ImageStyle = {
  height: "100%",
  width: "100%",
  resizeMode: "cover",
}

const $imageLoading: ImageStyle = {
  height: 0,
  width: 0,
}
