import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateLangMutation } from '@/services/userService'
import type { Lang } from '@/types/commonTypes'
import { useTranslation } from 'react-i18next'

const LangSwitcher = () => {
  const { t, i18n } = useTranslation()
  const [updateLang] = useUpdateLangMutation()

  const handleChangeLang = async (lang: Lang) => {
    if (lang !== 'en' && lang !== 'uk') return
    await i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
    await updateLang({ appLang: lang })
  }

  return (
    <Select value={i18n.language} onValueChange={handleChangeLang}>
      <SelectTrigger className='w-[140px] md:w-[200px] text-white'>
        <SelectValue placeholder={t('common.lang')} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('common.lang')}</SelectLabel>

          <SelectItem value='uk'>{t('common.uk')}</SelectItem>
          <SelectItem value='en'>{t('common.en')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LangSwitcher
