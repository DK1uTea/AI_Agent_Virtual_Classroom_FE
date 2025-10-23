'use client'
import { authApis } from "@/apis/gateways/auth-apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/shemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { email } from "zod";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<ForgotPasswordType>({
    mode: "onChange",
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    }
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: {
      email: string;
    }) => authApis.forgotPassword(data),
    onSuccess: (res) => {
      toast.success('If an account with that email exists, a password reset link has been sent.');

      let countdown = 5;

      const toastId = toast.info(`Redirecting to login page in ${countdown} seconds...`, {
        duration: 5000,
        id: 'redirect-countdown',
      });

      const countdownInterval = setInterval(() => {
        countdown -= 1;

        if (countdown > 0) {
          toast.info(`Redirecting to login page in ${countdown} seconds...`, {
            id: 'redirect-countdown',
            duration: countdown * 1000,
          });
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);

      setTimeout(() => {
        router.push('/login');
      }, 5000);
    },
    onError: (error) => {
      toast.error('Failed to process forgot password request.');
      console.error('Forgot password error:', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((errJson) => {
          toast.error(errJson.message || 'An error occurred while processing your request.');
        });
      }
    }
  });

  return (
    <form
      onSubmit={handleSubmit((data: ForgotPasswordType) => {
        forgotPasswordMutation.mutate(data);
      })}
      className="space-y-2"
    >
      <Input
        type={"email"}
        placeholder="Enter your email to receive the rest password link!"
        {...register("email")}
      />
      {errors.email && (
        <span className="text-sm text-red-600 block">{errors.email.message}</span>
      )}
      <Button
        disabled={forgotPasswordMutation.isPending}
        type="submit">Send Reset Link</Button>
    </form>
  );
};

export default ForgotPasswordForm;