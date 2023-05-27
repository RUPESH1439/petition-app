import React from "react"
import useGovernorate from "./api/useGovernorate"
import useRTL from "./useRTL"

export default function useFormattedGovernorates() {
  const { governorateData } = useGovernorate()
  const { isRTL } = useRTL()

  const _governorates = React.useMemo(
    () =>
      governorateData?.map(({ id, attributes }) => ({
        label: isRTL ? attributes?.arName : attributes?.enName,
        value: id,
      })) ?? [],
    [isRTL, governorateData],
  )

  const [governorates, setGovernorates] = React.useState(_governorates)
  React.useEffect(() => {
    setGovernorates([..._governorates])
  }, [isRTL])

  React.useEffect(() => {
    setGovernorates([..._governorates])
  }, [_governorates])
  return { governorates, setGovernorates }
}
