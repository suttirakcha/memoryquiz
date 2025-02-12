import { ENGLISH_TEXT, THAI_TEXT } from "../data/languages"

const useLanguage = (lang: string | undefined) => {
  const mainLang = lang === "th" ? THAI_TEXT : ENGLISH_TEXT;
  return { mainLang }
}

export default useLanguage