import { Separator } from "@/components/ui/separator";
import RegisterForm from "./register-form";
import LoginGoogle from "../login/login-google";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span>L</span>
          </div>
          <h1>Create a new account</h1>
          <p className="text-muted-foreground">
            Start your journey with us!
          </p>
        </div>

        <RegisterForm />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-2 text-muted-foreground">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <LoginGoogle text="Sign up with Google" />
        </div>

        <p className="text-center text-muted-foreground space-x-1">
          <span>Have an account?</span>
          <Link
            className="text-foreground hover:underline"
            href="/login">Login now</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;