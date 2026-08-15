import resources from '@/constants/translations'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const savedLang = localStorage.getItem('lang') ?? 'en'

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  ns: ['translations'],
  fallbackLng: 'en',
})

export default i18n
