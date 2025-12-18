'use client';

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { Telescope } from "lucide-react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

const DashboardHeader = () => {

  const {
    user
  } = useAuthStore(useShallow((state) => ({
    user: state.user,
  })));

  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1>Welcome back, {user?.username}! 👋</h1>
        <p className="text-muted-foreground">Continue your journey</p>
      </div>
      <Button onClick={() => router.push('/course-catalog')}>
        <Telescope className="mr-2 h-4 w-4" />
        Exploring Courses
      </Button>
    </div>
  );
};

export default DashboardHeader;