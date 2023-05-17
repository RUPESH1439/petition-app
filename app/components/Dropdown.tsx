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

  placeholderStyle?: TextStyle

  dropdownTextStyle?: TextStyle

  dropDownContainerStyle?: ViewStyle

  items: Item[]

  setItems: React.Dispatch<React.SetStateAction<Item[]>>

  placeholderTx?: TxKeyPath

  placeholder?: string

  value?: string

  onChange: (value: string) => void

  ArrowDownIconComponent?: any

  ArrowUpIconComponent?: any

  TickIconComponent?: any
}

/**
 * Describe your component here
 */
export const Dropdown = observer(function Dropdown(props: DropdownProps) {
  const {
    items,
    setItems,
    placeholderTx,
    onChange,
    style,
    dropdownTextStyle,
    value: _value,
    placeholder,
    dropDownContainerStyle,
    ArrowDownIconComponent,
    ArrowUpIconComponent,
    TickIconComponent,
    placeholderStyle,
  } = props

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(_value)

  const { isRTL } = useRTL()
  const textStyle: TextStyle = { textAlign: isRTL ? "right" : "left" }

  React.useEffect(() => {
    setValue(_value)
  }, [_value])
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
      ArrowDownIconComponent={ArrowDownIconComponent}
      ArrowUpIconComponent={ArrowUpIconComponent}
      TickIconComponent={TickIconComponent}
      placeholderStyle={[$text, $placeholderStyle, dropdownTextStyle, placeholderStyle]}
      textStyle={[$text, textStyle, dropdownTextStyle]}
      placeholder={placeholderTx ? I18n.t(placeholderTx) : placeholder || ""}
      style={[$container, value ? $containerSelected : $containerUnselected, style]}
      dropDownContainerStyle={[$dropDownContainer, dropDownContainerStyle]}
    />
  )
})

const $container: ViewStyle = {
  borderRadius: 30,
  borderWidth: 1,
  borderColor: colors.palette.neutral100,
}

const $containerSelected: ViewStyle = {
  backgroundColor: colors.palette.primary300,
}

const $containerUnselected: ViewStyle = {
  backgroundColor: colors.palette.neutral50,
}

const $dropDownContainer: ViewStyle = {
  borderWidth: 1,
  backgroundColor: colors.palette.primary300,

  borderColor: colors.palette.neutral100,
  paddingVertical: moderateVerticalScale(5),
  borderRadius: moderateVerticalScale(18),
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(15),
  color: colors.palette.neutral50,
  paddingHorizontal: 8,
  lineHeight: moderateVerticalScale(23),
}

const $placeholderStyle: TextStyle = {
  color: colors.palette.neutral100,
}

