'use client'
import { authApis } from "@/apis/gateways/auth-apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetAuthNextServerMutation } from "@/hooks/useSetAuthNextServer";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { LoginSchema, LoginType } from "@/shemaValidations/auth.schema";
import { useAuthStore } from "@/stores/auth-store";
import { User } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

const LoginForm = () => {
  const router = useRouter();

  const {
    setAuthState,
  } = useAuthStore(useShallow((state) => ({
    setAuthState: state.setAuthState,
  })));

  const { mutateAsync: setAuthNextServer } = useSetAuthNextServerMutation();

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
      username: "",
      password: ""
    }
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginType) => authApis.login(data),
    onSuccess: async (res) => {
      console.log('check res login >>>: ', res);
      setAuthState(true,
        {
          userId: res.userId,
          username: res.username,
          email: res.email
        },
        res.accessToken,
        res.refreshToken
      );
      await setAuthNextServer({
        user: {
          userId: res.userId,
          username: res.username,
          email: res.email
        },
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      })
      toast.success('Login successful! Welcome back.');
      reset();
      router.push('/dashboard');
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Error login: ', error);
          setError('username', {
            message: res.message
          });
          setError('password', {
            message: res.message
          });
          toast.error(res.message);
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
          <label>Username</label>
          <Input type="text" placeholder="Enter your username" {...register("username")} />
          {errors.username && <span className="text-red-500 dark:text-red-300">{errors.username.message}</span>}
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label className="flex justify-between w-full">
            <span>Password</span>
            <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
          </label>
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