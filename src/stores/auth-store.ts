import { User } from "@/types/user-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


type AuthState = {
  sessionToken: string;
}

type AuthStateAction = {
  setSessionToken: (token: string) => void;
  clearSessionToken: () => void;
}

type AuthStore = AuthState & AuthStateAction;

export const useAuthStore = create<AuthStore>()(
  immer(
    devtools(
      (set, get) => ({
        sessionToken: '',
        setSessionToken: (token: string) => {
          set((state) => {
            state.sessionToken = token;
          })
        },
        clearSessionToken: () => {
          set((state) => {
            state.sessionToken = '';
          })
        },
      }),
      {
        name: 'auth-store'
      }
    )
  )
)