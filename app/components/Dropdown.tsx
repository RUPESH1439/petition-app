import * as React from "react"
import { Pressable, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import DropDownPicker from "react-native-dropdown-picker"
import useRTL from "app/hooks/useRTL"
import I18n from "i18n-js"
import { TxKeyPath } from "app/i18n"
import { moderateVerticalScale } from "app/utils/scaling"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Text } from "./Text"

type Item = { label: string; value: string | number }
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

  value?: string | number

  onChange: (value: string) => void

  iconStyle?: ViewStyle

  propTextStyle?: TextStyle

  error?: TxKeyPath
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
    placeholderStyle,
    iconStyle,
    propTextStyle,
    error,
  } = props

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(_value)

  const { isRTL } = useRTL()
  const textStyle: TextStyle = { textAlign: isRTL ? "right" : "left" }

  React.useEffect(() => {
    setValue(_value)
  }, [_value])
  return (
    <>
      <DropDownPicker
        open={open}
        disableBorderRadius={false}
        value={value}
        showTickIcon={false}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={onChange}
        rtl={isRTL}
        renderListItem={(item) => (
          <Pressable
            onPress={() => {
              setOpen(false)
              setValue(item.value)
            }}
          >
            <Text text={item.label} style={[$text, textStyle, dropdownTextStyle, propTextStyle]} />
          </Pressable>
        )}
        labelStyle={$labelStyle}
        placeholderStyle={[$placeholderStyle, dropdownTextStyle, placeholderStyle]}
        textStyle={[$text, textStyle, dropdownTextStyle, propTextStyle]}
        placeholder={placeholderTx ? I18n.t(placeholderTx) : placeholder || ""}
        style={[
          $container,
          !!error && $errorContainer,
          value ? $containerSelected : $containerUnselected,
          style,
        ]}
        dropDownContainerStyle={[$dropDownContainer, dropDownContainerStyle]}
        ArrowDownIconComponent={() => (
          <FontAwesome5
            name="chevron-down"
            size={20}
            style={[$arrowDown, iconStyle]}
            color={value ? colors.palette.neutral50 : colors.palette.neutral100}
          />
        )}
      />
      {!!error && <Text tx={error} preset="error" style={$error} />}
    </>
  )
})

const $container: ViewStyle = {
  borderRadius: 30,
  borderWidth: 1,
  borderColor: colors.palette.neutral100,
  height: moderateVerticalScale(50),
}

const $errorContainer: ViewStyle = {
  borderColor: colors.palette.angry500,
}

const $containerSelected: ViewStyle = {
  backgroundColor: colors.palette.primary300,
}

const $containerUnselected: ViewStyle = {
  backgroundColor: colors.palette.neutral50,
}

const $dropDownContainer: ViewStyle = {
  backgroundColor: colors.palette.primary300,
  borderColor: colors.palette.primary300,
  paddingVertical: moderateVerticalScale(20),
  borderRadius: moderateVerticalScale(28),
  top: 0,
  flexDirection: "row",
  flex: 1,
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: moderateVerticalScale(18),
  color: colors.palette.neutral50,
  alignSelf: "center",
  lineHeight: moderateVerticalScale(45),
}

const $placeholderStyle: TextStyle = {
  color: colors.palette.neutral100,
  paddingLeft: 8,
  fontSize: moderateVerticalScale(16),
}

const $arrowDown: ViewStyle = {
  marginRight: spacing.extraSmall,
}

const $labelStyle: TextStyle = {
  textAlign: "center",
  lineHeight: moderateVerticalScale(27),
}

const $error: TextStyle = {
  marginTop: 5,
  marginLeft: spacing.medium,
}
