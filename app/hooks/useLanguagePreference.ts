import { STORAGE } from "app/constants/storage"
import { loadString, saveString } from "app/utils/storage"
import useRTL from "./useRTL"
import I18n from "i18n-js"

export default function useLanguagePreference() {
  const { setIsRTL } = useRTL()

  const getLanguagePreference = async () => {
    const _preference = await loadString(STORAGE.LANGUAGE)
    if (!_preference) return "en"

    I18n.locale = _preference
    setIsRTL(_preference === "ar")

    return _preference
  }
  const setLanguagePreference = async (language: "ar" | "en") => {
    await saveString(STORAGE.LANGUAGE, language)
    I18n.locale = language
    setIsRTL(language === "ar")

    return language
  }

  return { getLanguagePreference, setLanguagePreference }
}
