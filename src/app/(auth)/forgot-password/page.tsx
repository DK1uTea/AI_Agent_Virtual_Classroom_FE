import { Card } from "@/components/ui/card";
import ForgotPasswordForm from "./forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="p-8 max-w-lg mx-auto space-y-2">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <p className="text-muted-foreground">
          Please enter your email address to receive a password reset link.
        </p>
        <ForgotPasswordForm />
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;