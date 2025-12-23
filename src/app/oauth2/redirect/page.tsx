'use client';

import { useOAuth } from "@/hooks/useOAuth";
import { useAuthStore } from "@/stores/auth-store";
import { useSetAuthNextServerMutation } from "@/hooks/useSetAuthNextServer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useRef } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useShallow } from "zustand/shallow";

function OAuthRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const hasProcessed = useRef(false);

  const { setAuthState } = useAuthStore(useShallow((state) => ({
    setAuthState: state.setAuthState,
  })));

  const { mutateAsync: setAuthNextServer } = useSetAuthNextServerMutation();

  const { mutate: loginOAuth, isPending } = useOAuth(
    async (res) => {
      console.log('OAuth success:', res);

      // Update global client state
      setAuthState(true,
        {
          userId: res.userId,
          username: res.username,
          email: res.email
        },
        res.accessToken,
        res.refreshToken
      );

      // Sync with Next.js server session
      try {
        await setAuthNextServer({
          user: {
            userId: res.userId,
            username: res.username,
            email: res.email
          },
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });

        toast.success('Login successful! Redirecting...');
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to set server session:', error);
        toast.error('Failed to initialize session');
        router.push('/login');
      }
    },
    (error) => {
      console.error('OAuth login failed:', error);
      toast.error('Google login failed. Please try again.');
      router.push('/login');
    }
  );

  useEffect(() => {
    if (hasProcessed.current) return;
    if (code) {
      hasProcessed.current = true;
      loginOAuth({ code });
    } else {
      toast.error('No authorization code found');
      router.push('/login');
    }
  }, [code]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Authenticating with Google...</p>
    </div>
  );
}

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <OAuthRedirectContent />
    </Suspense>
  );
}
