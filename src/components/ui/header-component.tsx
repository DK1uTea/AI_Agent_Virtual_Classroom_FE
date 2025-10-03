'use client'
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
import LogoutButton from "./logout-button";

const HeaderComponent = () => {
  const { sessionToken } = useAuthStore(useShallow((state) => ({
    sessionToken: state.sessionToken,
  })))

  return (
    <>
      {
        !sessionToken && (
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
      {sessionToken && (
        <LogoutButton />
      )}
    </>
  );
}

export default HeaderComponent;