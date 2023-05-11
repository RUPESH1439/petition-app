import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import DropDownPicker from "react-native-dropdown-picker"
import useRTL from "app/hooks/useRTL"
import I18n from "i18n-js"
import { TxKeyPath } from "app/i18n"
import { moderateVerticalScale } from "app/utils/scaling"

type Item = { label: string; value: string }
export interface DropdownProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  items: Item[]

  setItems: React.Dispatch<React.SetStateAction<Item[]>>

  placeholderTx?: TxKeyPath

  onChange: (value: string) => void
}

/**
 * Describe your component here
 */
export const Dropdown = observer(function Dropdown(props: DropdownProps) {
  const { items, setItems, placeholderTx, onChange, style } = props

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(null)

  const { isRTL } = useRTL()
  const textStyle: TextStyle = { textAlign: isRTL ? "right" : "left" }

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={onChange}
      rtl={isRTL}
      placeholderStyle={[$text, textStyle]}
      textStyle={[$text, textStyle]}
      placeholder={placeholderTx ? I18n.t(placeholderTx) : ""}
      style={[$container, style]}
      dropDownContainerStyle={$dropDownContainer}
    />
  )
})

const $container: ViewStyle = {
  borderRadius: 30,
  borderWidth: 1,
  backgroundColor: colors.palette.neutral50,
  borderColor: colors.palette.neutral100,
}

const $dropDownContainer: ViewStyle = {
  borderWidth: 1,
  backgroundColor: colors.palette.neutral50,
  borderColor: colors.palette.neutral100,
  paddingVertical: moderateVerticalScale(5),
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(15),
  color: colors.palette.neutral100,
  paddingHorizontal: 8,
}
