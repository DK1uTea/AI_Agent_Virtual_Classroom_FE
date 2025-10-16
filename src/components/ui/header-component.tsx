'use client'
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
import LogoutButton from "./logout-button";

const HeaderComponent = () => {
  const { isAuth, user } = useAuthStore(useShallow((state) => ({
    isAuth: state.isAuth,
    user: state.user,
  })))

  return (
    <>
      {
        !isAuth && (
          <ul className="flex items-center gap-2">
            <li>
              <Link href={'/login'}>Login</Link>
            </li>
            <li>
              <Link href={'/register'}>Register</Link>
            </li>
          </ul>
        )
      }
      {isAuth && (
        <LogoutButton />
      )}
    </>
  );
}

export default HeaderComponent;