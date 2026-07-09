import { type SignUpFormData, SignUpFormSchema } from "@/schemas/signUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useSignUpMutation } from "@/services/auth-service";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const SignUpForm = () => {
  //   const [signUpUser, { data, isSuccess, isError }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema()),
    mode: "onChange",
  });

  const handleResetForm = () => {
    reset();
    clearErrors();
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.log("Sign Up failed", error);
    }
  };

  return (
    <>
      <Card className="w-ful lg:max-w-[380px] bg-white/80 border-black border-3 rounded-lg p-8 gap-0">
        <CardTitle className="text-center font-bold text-2xl ">
          Sign Up{" "}
        </CardTitle>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2" htmlFor="nickname">
                Nickname:
              </FieldLabel>
              <Input
                {...register("nickname")}
                id="nickname"
                placeholder="Example Nickname..."
                className="text-lg"
                aria-invalid={!!errors.nickname}
              />
            </Field>
            {errors.nickname && <FieldError errors={[errors.nickname]} />}
          </FieldGroup>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2" htmlFor="fullname">
                Fullname:
              </FieldLabel>
              <Input
                {...register("fullname")}
                id="fullname"
                placeholder="Example Fullname..."
                className="text-lg"
                aria-invalid={!!errors.fullname}
              />
            </Field>
            {errors.fullname && <FieldError errors={[errors.fullname]} />}
          </FieldGroup>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2" htmlFor="email">
                Email:
              </FieldLabel>
              <Input
                {...register("email")}
                id="email"
                placeholder="Example@mail.com"
                className="text-lg"
                aria-invalid={!!errors.email}
              />
            </Field>
            {errors.email && <FieldError errors={[errors.email]} />}
          </FieldGroup>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2" htmlFor="password">
                Password:
              </FieldLabel>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Password"
                className="text-lg"
                aria-invalid={!!errors.nickname}
              />
            </Field>
            {errors.password && <FieldError errors={[errors.password]} />}
          </FieldGroup>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2" htmlFor="confirmPassword">
                Confirm Password:
              </FieldLabel>
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="text-lg"
                aria-invalid={!!errors.confirmPassword}
              />
            </Field>
            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
          </FieldGroup>
          <div className="py-4 w-full flex justify-end">
            <Button data-cursor="hover" type="reset" onClick={handleResetForm}>
              Reset
            </Button>
            <Button data-cursor="hover" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default SignUpForm;
