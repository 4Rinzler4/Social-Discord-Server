import { Card } from '@/components/ui/card'
// import FormGif from "@/assets/gif/form.gif";
import signupGif from '@/assets/gif/signupGif.gif'
import SignUpForm from '../SignUpForm/SignUpForm'
import { Button } from '@/components/ui/button'
import { TypographyP } from '@/components/ui/typography'
import { useTranslation } from 'react-i18next'

type SignUpDialogProps = {
  onSwitch: () => void
}

const SignUpDialog = ({ onSwitch }: SignUpDialogProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Card className='flex flex-row w-full max-w-4xl overflow-hidden p-0 border-2 gap-0'>
        <div className='flex flex-1 flex-col justify-center'>
          <SignUpForm />
          <div className='flex justify-center items-center w-full pb-5'>
            <TypographyP className=''>{t('form.haveAccount')}</TypographyP>
            <Button
              data-cursor='hover'
              variant='link'
              className='font-bold'
              onClick={onSwitch}
            >
              {t('form.login')}
            </Button>
          </div>
        </div>

        <img
          src={signupGif}
          alt='Form gif'
          className='hidden md:flex w-120 object-cover'
        />
      </Card>
    </>
  )
}

export default SignUpDialog
