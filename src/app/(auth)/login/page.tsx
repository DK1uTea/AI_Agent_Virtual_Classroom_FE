'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleNavigate = (pageUrl: string) => {
    router.push(pageUrl);
  }
  return (
    <div>
      <h1>Login Page</h1>
      <Button onClick={() => {
        handleNavigate('/');
      }}>Navigate Home Page</Button>
    </div>
  );
}

export default LoginPage;