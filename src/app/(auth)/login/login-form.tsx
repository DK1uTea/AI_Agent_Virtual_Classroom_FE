'use client'
import { authApis } from "@/apis/gateways/auth-apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { LoginSchema, LoginType } from "@/shemaValidations/auth.schema";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

const LoginForm = () => {
  const router = useRouter();

  const { setSessionToken } = useAuthStore(useShallow((state) => ({
    setSessionToken: state.setSessionToken,
  })));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginType) => authApis.login(data),
    onSuccess: async (res) => {
      console.log('check res login >>>: ', res);
      setSessionToken(res.token);
      const resFromNextServer = await authApis.requestNextServerSetCookies(res);
      console.log("resFromNextServer >>>", resFromNextServer);
      toast.success('Login successful!');
      reset();
      router.refresh();
      router.push('/me');
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Error login: ', error);
          if (res.errors[0].field === 'email') {
            setError('email', {
              message: res.errors[0].message
            });
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

  const handleLoginFormSubmit = async (data: LoginType) => {
    clearErrors();
    loginMutation.mutate(data);
  };

  return (
    <form className="flex flex-col justify-center items-center gap-5 w-full" onSubmit={handleSubmit(handleLoginFormSubmit)}>
      <div className="flex flex-col gap-3 w-full">
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

      </div>
      <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;