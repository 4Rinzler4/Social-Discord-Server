import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LogInFormSchema, type LogInFormData } from "@/schemas/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// import { useLoginMutation } from "@/services/auth-service";

const LoginForm = () => {
  // const [loginUser, { data, isSuccess, isError }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: zodResolver(LogInFormSchema()),
    mode: "onChange",
  });

  const onSubmit = async (data: LogInFormData) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.log(`Login error: ${error}`);
    }
  };

  return (
    <>
      <Card className="w-full ring-0 border-bottom shadow-none rounded-none p-0 gap-0">
        <CardHeader className="text-center font-bold text-2xl">
          {t("form.login")}
        </CardHeader>
        <form className="px-5" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel>{t("form.labels.nickname")}</FieldLabel>
              <Input
                {...register("nickname")}
                placeholder="Example Nickname..."
                aria-invalid={!!errors.nickname}
              />
            </Field>
            {errors.nickname && <FieldError errors={[errors.nickname]} />}
          </FieldGroup>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2">{t("form.labels.email")}</FieldLabel>
              <Input
                {...register("email")}
                placeholder="Example@mail.com"
                aria-invalid={!!errors.email}
              />
            </Field>
            {errors.email && <FieldError errors={[errors.email]} />}
          </FieldGroup>
          <FieldGroup className="gap-1">
            <Field className="gap-1">
              <FieldLabel className="pt-2">
                {t("form.labels.password")}
              </FieldLabel>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>
            {errors.password && <FieldError errors={[errors.password]} />}
          </FieldGroup>
          <div className="py-3 w-full flex justify-evenly">
            <Button data-cursor="hover" type="reset" onClick={() => {}}>
              {t("form.reset")}
            </Button>
            <Button data-cursor="hover" type="submit">
              {t("form.submit")}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
