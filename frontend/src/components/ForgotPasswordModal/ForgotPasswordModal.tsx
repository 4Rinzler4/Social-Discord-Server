import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import {
  type forgotPasswordData,
  forgotPasswordSchema,
} from '@/schemas/forgotPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const ForgotPasswordModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<forgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema()),
    mode: 'onChange',
  })

  const onSubmit = async (data: forgotPasswordData) => {
    try {
    } catch {}
  }

  const handleClear = () => {
    reset()
  }

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardContent></CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email:</FieldLabel>
              <Input
                {...register('email')}
                placeholder='Enter email...'
                aria-invalid={!!errors.email}
              />
            </Field>
            {errors.email && <FieldError errors={[errors.email]} />}
          </FieldGroup>
          <Button type='reset' onClick={handleClear}>
            Clear
          </Button>
          <Button disabled={!isValid} type='submit'>
            Send
          </Button>
        </form>
      </Card>
    </>
  )
}

export default ForgotPasswordModal
