'use client'
import { authApis } from "@/app/apis/gateways/auth-apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginType } from "@/shemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleLoginFormSubmit = async (data: LoginType) => {
    try {
      setIsLoading(true);
      const res = await authApis.login(data);
      console.log('check res login >>>: ', res);
      toast.success('Login successful!');
      reset();
      router.push("/");
    } catch (error) {
      console.error('Error login: ', error);
    } finally {
      setIsLoading(false);
    }
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
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? (
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