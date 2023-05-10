import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { useForm } from "react-hook-form"
import { TextField } from "./TextField"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./Button"
import { ScrollView } from "react-native-gesture-handler"

const schema = z.object({
  organizationName: z.string(),
  nearestLandMark: z.string(),
  ceoName: z.string(),
  ceoPhone: z.string(),
  organizationPhone: z.string(),
  organizationSocialMediaLinks: z.array(z.string()),
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
  const $styles = [$container, style]

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      organizationName: "",
      ceoName: "",
      ceoPhone: "",
      organizationPhone: "",
      organizationSocialMediaLinks: "",
    },
  })

  const onSubmit = (data) => console.log(data)

  return (
    <View style={$styles}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <Text tx="createOrganizationAccount.header" style={$header} />
        <TextField
          control={control}
          name="organizationName"
          placeholderTx="createOrganizationAccount.organizationName"
          status={errors?.organizationName ? "error" : null}
          error={errors?.organizationName ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <Text tx="createOrganizationAccount.ceoInfo" style={$header} />
        <TextField
          control={control}
          name="ceoName"
          placeholderTx="createOrganizationAccount.name"
          status={errors?.ceoName ? "error" : null}
          error={errors?.ceoName ? "auth.signIn" : null}
          containerStyle={$textInput}
        />
        <TextField
          control={control}
          name="ceoPhone"
          placeholderTx="createOrganizationAccount.phoeNumber"
          status={errors?.ceoPhone ? "error" : null}
          error={errors?.ceoPhone ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <Text tx="createOrganizationAccount.contactInfo" style={$header} />
        <TextField
          control={control}
          name="organizationPhone"
          placeholderTx="createOrganizationAccount.organizationPhoneNumber"
          status={errors?.organizationPhone ? "error" : null}
          error={errors?.organizationPhone ? "auth.signIn" : null}
          containerStyle={$textInput}
          keyboardType="phone-pad"
        />
        <TextField
          control={control}
          name="ceoPhone"
          placeholderTx="createOrganizationAccount.phoeNumber"
          status={errors?.ceoPhone ? "error" : null}
          error={errors?.ceoPhone ? "auth.signIn" : null}
          containerStyle={$textInput}
        />

        <Button tx="common.continue" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.medium,
}

const $header: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 18,
  color: colors.palette.neutral100,
  marginBottom: spacing.medium,
  marginTop: spacing.medium,
}

const $textInput: ViewStyle = {
  marginBottom: spacing.large,
}
