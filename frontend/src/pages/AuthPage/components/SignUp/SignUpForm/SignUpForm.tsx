import { type SignUpFormData, SignUpFormSchema } from '@/schemas/signUpSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUpMutation } from '@/services/authService'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AlertModal from '@/components/AlertModal/AlertModal'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { ApiError } from '@/interfaces/errorInterfaces'

const SignUpForm = () => {
  const [signUpUser, { data, isSuccess }] = useSignUpMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    clearErrors,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema()),
    mode: 'onChange',
  })

  const handleResetForm = () => {
    reset()
    clearErrors()
  }

  const onSubmit = async (data: SignUpFormData) => {
    const appLang = i18n.language
    try {
      await signUpUser({ ...data, appLang }).unwrap()
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
          title={t('errors.signUp.errorTitle')}
          description={t(`errors.${errorCode}`)}
          onClose={handleCloseAlert}
        />
      )}
      <Card className='w-full py-4 ring-0 border-bottom shadow-none rounded-none p-0 gap-0'>
        <CardHeader className='text-center font-bold text-2xl pt-7'>
          {t('form.signup')}
        </CardHeader>
        <form className='px-5' onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2' htmlFor='nickname'>
                {t('form.labels.nickname')}
              </FieldLabel>
              <Input
                {...register('nickname')}
                id='nickname'
                placeholder={t('form.labels.nickname')}
                className='text-lg'
                aria-invalid={!!errors.nickname}
              />
            </Field>
            {errors.nickname && <FieldError errors={[errors.nickname]} />}
          </FieldGroup>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2' htmlFor='fullname'>
                {t('form.labels.fullname')}
              </FieldLabel>
              <Input
                {...register('fullname')}
                id='fullname'
                placeholder={t('form.labels.fullname')}
                className='text-lg'
                aria-invalid={!!errors.fullname}
              />
            </Field>
            {errors.fullname && <FieldError errors={[errors.fullname]} />}
          </FieldGroup>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2' htmlFor='email'>
                {t('form.labels.email')}
              </FieldLabel>
              <Input
                {...register('email')}
                id='email'
                placeholder={t('form.labels.email')}
                className='text-lg'
                aria-invalid={!!errors.email}
              />
            </Field>
            {errors.email && <FieldError errors={[errors.email]} />}
          </FieldGroup>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2' htmlFor='password'>
                {t('form.labels.password')}
              </FieldLabel>
              <div className='relative'>
                <Input
                  {...register('password')}
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('form.labels.password')}
                  className='pr-10 text-lg'
                  aria-invalid={!!errors.password}
                />

                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                  onClick={() => setShowPassword((prev) => !prev)}
                  data-cursor='hover'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>
            {errors.password && <FieldError errors={[errors.password]} />}
          </FieldGroup>
          <FieldGroup className='gap-1'>
            <Field className='gap-1'>
              <FieldLabel className='pt-2' htmlFor='confirmPassword'>
                {t('form.labels.confirmPassword')}
              </FieldLabel>
              <div className='relative'>
                <Input
                  {...register('confirmPassword')}
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('form.labels.confirmPassword')}
                  className='text-lg'
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  data-cursor='hover'
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </Field>
            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
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

export default SignUpForm
