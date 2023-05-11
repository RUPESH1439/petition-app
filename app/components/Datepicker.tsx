import * as React from "react"
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { moderateVerticalScale } from "app/utils/scaling"
import DateTimePicker from "@react-native-community/datetimepicker"
import { TxKeyPath } from "app/i18n"
import I18n from "i18n-js"
import { formatDate } from "app/utils/formatDate"
import useRTL from "app/hooks/useRTL"

type IOSDisplay = "default" | "compact" | "inline" | "spinner"

export interface DatepickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  date: Date

  onChange: (date: Date) => void

  display?: IOSDisplay

  placeholderTx?: TxKeyPath
}

/**
 * Describe your component here
 */
export const Datepicker = observer(function Datepicker(props: DatepickerProps) {
  const { style, date, onChange, display, placeholderTx } = props
  const $styles = [$inputWrapperStyle, style]
  const [open, setOpen] = React.useState(false)
  const { isRTL } = useRTL()
  return (
    <Pressable
      onPress={() => {
        setOpen(true)
      }}
      style={$styles}
    >
      {open ? (
        <DateTimePicker
          style={$datepicker(isRTL)}
          mode="date"
          display={display ?? "default"}
          value={date ?? new Date()}
          onChange={async (_, selectedDate) => {
            setOpen(false)
            onChange(selectedDate)
          }}
          locale={isRTL ? "ar" : "en"}
        />
      ) : (
        <Text
          text={date ? formatDate(date.toISOString()) : I18n.t(placeholderTx)}
          style={$text}
        ></Text>
      )}
    </Pressable>
  )
})

const $inputWrapperStyle: ViewStyle = {
  borderWidth: 1,
  borderRadius: 30,
  paddingVertical: spacing.extraSmall,
  backgroundColor: colors.palette.neutral50,
  borderColor: colors.palette.neutral100,
  overflow: "hidden",
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(15),
  color: colors.palette.neutral100,
  paddingHorizontal: spacing.medium,
  textAlignVertical: "center",
  lineHeight: moderateVerticalScale(29),
}

const $datepicker = (isRTL: boolean): ViewStyle => ({
  alignSelf: isRTL ? "flex-end" : "flex-start",
})
