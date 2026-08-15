import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { LogInFormSchema, type LogInFormData } from '@/schemas/logInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLoginMutation } from '@/services/authService'
import { useNavigate } from 'react-router-dom'
import AlertModal from '@/components/AlertModal/AlertModal'
import type { ApiError } from '@/interfaces/errorInterfaces'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const LoginForm = () => {
  const [loginUser, { data, isSuccess }] = useLoginMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)

  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LogInFormData>({
    resolver: zodResolver(LogInFormSchema()),
    mode: 'onChange',
  })

  const onSubmit = async (data: LogInFormData) => {
    try {
      await loginUser(data).unwrap()
      reset()
    } catch (error) {
      const ApiError = error as FetchBaseQueryError
      if ('data' in ApiError) {
        const data = ApiError.data as ApiError
        setErrorCode(data.code)
      }
      setShowAlert(true)
    }
  }

  const handleResetForm = () => {
    reset()
  }

  useEffect(() => {
    if (isSuccess && data.accessToken) {
      navigate('/', { replace: true })
    }
  }, [isSuccess, data, navigate])

  const handleCloseAlert = () => {
    if (!showAlert) return
    setShowAlert(false)
  }

  return (
    <>
      {showAlert && (
        <AlertModal
          className='block md:absolute top-0 left-0 w-full'
          title={t('errors.login.errorTitle')}
          description={t(`errors.${errorCode}`)}
          onClose={handleCloseAlert}
        />
      )}
      <Card className='w-full ring-0 border-bottom shadow-none rounded-none p-0 gap-0'>
        <CardHeader className='text-center font-bold text-2xl'>
          {t('form.login')}
        </CardHeader>
        <form className='px-5' onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2'>{t('form.labels.email')}</FieldLabel>
              <Input
                {...register('email')}
                placeholder={t('form.labels.email')}
                aria-invalid={!!errors.email}
              />
            </Field>
            {errors.email && <FieldError errors={[errors.email]} />}
          </FieldGroup>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2'>
                {t('form.labels.password')}
              </FieldLabel>
              <div className='relative'>
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('form.labels.password')}
                  aria-invalid={!!errors.password}
                />
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>
            {errors.password && <FieldError errors={[errors.password]} />}
          </FieldGroup>
          <div className='h-25 py-3 gap-1 flex flex-col'>
            <Button
              className='w-full h-10 font-bold'
              data-cursor='hover'
              variant='secondary'
              type='reset'
              onClick={handleResetForm}
            >
              {t('form.reset')}
            </Button>
            <Button
              disabled={!isValid}
              className='w-full h-10 font-bold hover:bg-white/200 hover:text-black hover:border-2 hover: border-black transition-colors duration-300'
              data-cursor='hover'
              type='submit'
            >
              {t('form.submit')}
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export default LoginForm
