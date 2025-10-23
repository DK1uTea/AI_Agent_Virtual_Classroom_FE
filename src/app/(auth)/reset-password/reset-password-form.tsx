'use client'

import { authApis } from "@/apis/gateways/auth-apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { ResetPasswordSchema, ResetPasswordType } from "@/shemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<ResetPasswordType>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: {
      newPassword: string;
      token: string;
    }) => authApis.resetPassword(data),
    onSuccess: (res) => {
      toast.success('Password has been reset successfully.');
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
      toast.error('Failed to process reset password request.');
      console.error('Reset password error:', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((errJson) => {
          toast.error(errJson.message || 'An error occurred while processing your request.');
        });
      }
    }
  });

  return (
    <form
      onSubmit={handleSubmit((data: ResetPasswordType) => {
        resetPasswordMutation.mutate({
          newPassword: data.newPassword,
          token
        });
      })}
      className="space-y-2"
    >
      <Input
        type="password"
        placeholder="Enter your new password"
        {...register("newPassword")}
      />
      {errors.newPassword && (
        <span className="text-sm text-red-600 block">{errors.newPassword.message}</span>
      )}
      <Button
        disabled={resetPasswordMutation.isPending}
        type="submit">Reset Password</Button>
    </form>
  );
}

export default ResetPasswordForm;