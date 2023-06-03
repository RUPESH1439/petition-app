import React from "react"
import useRTL from "./useRTL"
import useGender from "./api/useGender"

export default function useFormattedGenders() {
  const { genderData } = useGender()
  const { isRTL } = useRTL()

  const _genders = React.useMemo(
    () =>
      genderData?.map(({ id, attributes }) => ({
        label: isRTL ? attributes?.arType : attributes?.enType,
        value: id,
      })) ?? [],
    [isRTL, genderData],
  )

  const [genders, setGenders] = React.useState(_genders)
  React.useEffect(() => {
    setGenders([...genders])
  }, [isRTL])

  React.useEffect(() => {
    setGenders([..._genders])
  }, [_genders])
  return { genders, setGenders }
}
