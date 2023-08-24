import locales from '@/locales/loader'
import { ref } from 'vue'

interface ILocales {
  [key: string]: {
    [key: string]: string
  }
}


const currentLanguage = ref('en')

const findClosestIndex = (pattern: number[], count: number) => {
  const index = pattern.findIndex((p) => count <= p)
  return index === -1 ? pattern.length : index
}

export function t (key: string, dynamicVars : null|{[key: string]: string} = null, count: null|number = null, rules: null|{[key: string]:number[]} = null) : string {
  const translations: ILocales = locales()
  const languageSpectrum = Object.keys(translations)

  if (languageSpectrum.includes(currentLanguage.value)) {
    const translationString = translations[currentLanguage.value][key]
    if (!translationString) return key

    if (translationString.includes('|') && count !== null) {
      const translationStringArray = translationString.split('|')
      let selectedTranslation = ''
      if (translationStringArray.length && rules && typeof rules === 'object' && rules[currentLanguage.value]) {
        selectedTranslation = translationStringArray[findClosestIndex(rules[currentLanguage.value], count)]
      } else if (translationStringArray.length === 1) {
        selectedTranslation = translationStringArray[0]
      } else if (translationStringArray.length === 2) {
        selectedTranslation = count > 1 ? translationStringArray[1] : translationStringArray[0]
      } else if (translationStringArray.length > 2) {
        selectedTranslation = count > 1
          ? translationStringArray[2]
          : count === 1 ? translationStringArray[1] : translationStringArray[0]
      }

      return selectedTranslation.replace(/{([^}]+)}/g, () => String(count))
    }

    if (!dynamicVars || typeof dynamicVars !== 'object') return translationString
    return translationString.replace(/{([^}]+)}/g, (match, rkey) => dynamicVars[rkey] || match)
  }
  return key
}

export function translator (key: string) : string {
  const translations: ILocales = locales()
  const languageSpectrum = Object.keys(translations)
  if (languageSpectrum.includes(currentLanguage.value)) {
    return translations[currentLanguage.value][key] || key
  }
  return key
}

export function setLanguage (lang: string) {
  currentLanguage.value = lang
}

export function getLanguage () {
  return currentLanguage.value
}
