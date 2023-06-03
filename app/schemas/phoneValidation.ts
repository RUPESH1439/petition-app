import I18n from "i18n-js"
import { z } from "zod"

const phoneValidation = z
  .string()
  .refine((value) => /^07\d*$/.test(value), {
    message: I18n.translate("errors.wrongFormat"),
  })
  .refine(
    (value) => value.length === 11,
    (val) => ({
      message: `${11 - val.length} ${I18n.translate("errors.phone")}`,
    }),
  )

export default phoneValidation
