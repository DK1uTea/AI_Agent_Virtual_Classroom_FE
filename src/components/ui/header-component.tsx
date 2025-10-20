'use client'
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LogoutNextServerReq } from "@/apis/requests/auth-req";
import { authApis } from "@/apis/gateways/auth-apis";
import { toast } from "sonner";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { clear } from "console";
import { use } from "react";

const HeaderComponent = () => {
  const { user, clearAuthState } = useAuthStore(useShallow((state) => ({
    user: state.user,
    clearAuthState: state.clearAuthState,
  })))

  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: (req: LogoutNextServerReq) => authApis.reqLogoutNextServer(req),
    onSuccess: () => {
      clearAuthState();
      router.refresh();
      router.push('/login');
      toast.success("Logout successful!");
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Logout error: ', error);
          toast.error(res.message);
        })
      }
    }
  });

  const onClickLogout = async () => {
    logoutMutation.mutate({ forced: false });
    console.log("Logout ne!!!");
  }

  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.username} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p>{user.username}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onClickLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderComponent;