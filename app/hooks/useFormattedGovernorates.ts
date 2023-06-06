import React from "react"
import useGovernorate from "./api/useGovernorate"
import useRTL from "./useRTL"
import I18n from "i18n-js"

export const ALL_GOVERNORATES_ID = 999

export default function useFormattedGovernorates(onlyCities = false, filterAll = false) {
  const { governorateData } = useGovernorate()
  const { isRTL } = useRTL()

  const _governorates = React.useMemo(() => {
    const __governorates =
      governorateData
        ?.filter(({ attributes }) => (onlyCities ? attributes?.isCountry === false : true))
        ?.map(({ id, attributes }) => ({
          label: isRTL ? attributes?.arName : attributes?.enName,
          value: id,
        })) ?? []
    return filterAll
      ? [{ label: I18n.translate("common.all"), value: ALL_GOVERNORATES_ID }, ...__governorates]
      : __governorates
  }, [isRTL, governorateData])

  const [governorates, setGovernorates] = React.useState(_governorates)
  React.useEffect(() => {
    setGovernorates([..._governorates])
  }, [isRTL])

  React.useEffect(() => {
    setGovernorates([..._governorates])
  }, [_governorates])
  return { governorates, setGovernorates }
}
