import { Card } from '@/components/ui/card'
import LoginForm from '../LoginForm/LoginForm'
import { Button } from '@/components/ui/button'
import { TypographyP } from '@/components/ui/typography'
import { useTranslation } from 'react-i18next'
import LoginGif from '@/assets/gif/loginGif.gif'

type LoginDialogProps = {
  onSwitch: () => void
}

const LoginDialog = ({ onSwitch }: LoginDialogProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Card className='flex flex-row w-full max-w-4xl overflow-hidden p-0 border-2 gap-0'>
        <img
          src={LoginGif}
          alt='Form gif'
          className='hidden md:flex w-120 object-cover'
        />
        <div className='relative flex flex-1 flex-col justify-center'>
          <LoginForm />
          <div className='flex justify-center items-center w-full'>
            <TypographyP className=''>{t('form.!haveAccount')}</TypographyP>
            <Button
              data-cursor='hover'
              variant='link'
              className='font-bold'
              onClick={onSwitch}
            >
              {t('form.signup')}
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default LoginDialog
