import { cookies } from "next/headers";
import LoginForm from "./components/login-form";
import FlashToast from "@/components/ui/flash-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import LoginGoogle from "./components/login-google";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const logoutType = cookieStore.get('logoutType')?.value;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span>A</span>
          </div>
          <h1>Login to AI Virtual Classroom</h1>
          <p className="text-muted-foreground">
            Welcome back!
          </p>
        </div>

        <LoginForm />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <LoginGoogle text="Login with Google" />
        </div>

        <p className="text-center text-muted-foreground space-x-1">
          <span>Don't have an account?</span>
          <Link
            className="text-foreground hover:underline"
            href="/register">Sign up now</Link>
        </p>
      </div>
      {
        logoutType === 'forced' &&
        <FlashToast toastType="info" message="Your session is expired, please login again!" />
      }
    </div>
  );
}

export default LoginPage;