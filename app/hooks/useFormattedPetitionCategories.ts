import React from "react"
import useRTL from "./useRTL"
import usePetitionCategory from "./api/usePetitionCategory"

export default function useFormattedPetitionCategories() {
  const { petitionCategoryData } = usePetitionCategory()

  const { isRTL } = useRTL()

  const _categories = React.useMemo(
    () =>
      petitionCategoryData?.map(({ attributes, id }) => ({
        value: id,
        label: isRTL ? attributes?.arName : attributes?.enName,
      })) ?? [],
    [isRTL, petitionCategoryData],
  )
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    setCategories([..._categories])
  }, [isRTL])

  React.useEffect(() => {
    setCategories([..._categories])
  }, [_categories])
  return { categories, setCategories }
}
