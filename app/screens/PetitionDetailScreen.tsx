import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { Screen, ScreenHeader, Text } from "app/components"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import useGetPetition from "app/hooks/api/useGetPetition"
import formatPetitions from "app/utils/api/formatPetitions"
import useUser from "app/hooks/userUser"
import { colors } from "app/theme"
import { moderateVerticalScale } from "app/utils/scaling"
import AntDesign from "react-native-vector-icons/AntDesign"
import truncateString from "app/utils/truncateString"
import { PetitionDetailCard } from "app/components/PetitionCard/PetitionDetailCard"

interface PetitionDetailScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"PetitionDetail">> {}

export const PetitionDetailScreen: FC<PetitionDetailScreenProps> = observer(
  function PetitionDetailScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const route = useRoute<RouteProp<AppStackParamList, "PetitionDetail">>()
    const { petitionData, petitionInitalLoading } = useGetPetition(route?.params?.petitionId)
    const { user } = useUser()
    const formattedPetition = formatPetitions([petitionData], false, user?.owner?.id)
    const {
      id,
      city,
      category,
      viewsCount,
      signsCount,
      name,
      isOrg,
      status,
      isPrivileged,
      date,
      photoUrl,
      title,
      description,
      signers,
      petitionImageUrl,
      creatorId,
      petitionStatId,
      isAnonymous,
    } = formattedPetition?.[0]
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    return (
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$root}>
        <ScreenHeader
          tx="petitionDetail.title"
          presets="backAndTitle"
          onButtonPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack()
            } else {
              navigation.navigate("HomeTab")
            }
          }}
          RightAccessory={
            <View style={$nameContainer}>
              {!!isPrivileged && (
                <AntDesign name={"checkcircle"} size={24} color={colors.palette.primary100} />
              )}
              {!isAnonymous && (
                <Text
                  numberOfLines={1}
                  preset="primaryBold"
                  text={truncateString(12, name)}
                  style={$detailTextStyle}
                />
              )}
            </View>
          }
        />

        {petitionInitalLoading ? (
          <View style={$container}>
            <ActivityIndicator size="large" color={colors.palette.primary100} />
          </View>
        ) : (
          <PetitionDetailCard
            disableTouch={true}
            id={id}
            city={city}
            category={category}
            viewsCount={viewsCount}
            signsCount={signsCount}
            name={name}
            isOrg={isOrg}
            status={status}
            isPrivileged={isPrivileged}
            date={date}
            photoUrl={photoUrl}
            title={title}
            description={description}
            isAnonymous={true}
            signers={signers}
            petitionImageUrl={petitionImageUrl}
            creatorId={creatorId}
            petitionStatId={petitionStatId}
          />
        )}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $nameContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  gap: moderateVerticalScale(10),
}

const $detailTextStyle: TextStyle = {
  fontSize: moderateVerticalScale(18),
  textAlign: "center",
  color: colors.palette.neutral100,
}
