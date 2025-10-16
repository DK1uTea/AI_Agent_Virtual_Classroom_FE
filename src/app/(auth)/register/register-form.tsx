'use client'

import { authApis } from "@/apis/gateways/auth-apis";
import { RegisterReq } from "@/apis/requests/auth-req";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { kyLocalInstance } from "@/config/ky";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { RegisterSchema, RegisterType } from "@/shemaValidations/auth.schema";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm<RegisterType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterType) => authApis.register(data),
    onSuccess: async (res) => {
      console.log('check res register >>>: ', res);
      toast.success('Register successful! Please login to continue.');
      reset();
      router.refresh();
      router.push('/login');
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Error register: ', error);
          if (res.errors[0].field === 'email') {
            setError('email', {
              message: res.errors[0].message
            })
          }
          if (res.errors[0].field === 'password') {
            setError('password', {
              message: res.errors[0].message
            });
          }
          toast.error(res.errors[0].message);
        })
      }
    }
  });

  const handleRegisterFormSubmit = async (data: RegisterType) => {
    clearErrors();
    registerMutation.mutate(data);
  }

  return (
    <form className="flex flex-col justify-center items-center gap-5 w-full" onSubmit={handleSubmit(handleRegisterFormSubmit)}>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full flex flex-col items-start gap-2">
          <label>User Name</label>
          <Input type="string" placeholder="Enter your username" {...register("username")} />
          {errors.username && <span className="text-red-500 dark:text-red-300">{errors.username.message}</span>}
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label>Email</label>
          <Input type="email" placeholder="Enter your email" {...register("email")} />
          {errors.email && <span className="text-red-500 dark:text-red-300">{errors.email.message}</span>}
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label>Password</label>
          <Input type="password" placeholder="Enter your password" {...register("password")} />
          {errors.password && <span className="text-red-500 dark:text-red-300">{errors.password.message}</span>}
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label>Confirm Password</label>
          <Input type="password" placeholder="Confirm your password" {...register("confirmPassword")} />
          {errors.confirmPassword && <span className="text-red-500 dark:text-red-300">{errors.confirmPassword.message}</span>}
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;