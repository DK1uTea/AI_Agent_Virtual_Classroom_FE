import { Card } from "@/components/ui/card";
import ResetPasswordForm from "./reset-password-form";

const ResetPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="p-8 max-w-lg mx-auto space-y-2">
        <h1 className="text-2xl font-semibold">Reset Password here!</h1>
        <p className="text-muted-foreground">
          Please enter your new password!
        </p>
        <ResetPasswordForm />
      </Card>
    </div>
  );
};

export default ResetPasswordPage;