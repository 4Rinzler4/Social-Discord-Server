import resources from '@/constants/translations'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['translations'],
})

i18n.languages = ['en', 'uk']

export default i18n
