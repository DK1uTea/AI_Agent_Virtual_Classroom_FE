import { User } from "@/types/user-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


type AuthState = {
  isAuth: boolean;
  user: User
}

type AuthStateAction = {
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

type AuthStore = AuthState & AuthStateAction;

export const useAuthStore = create<AuthStore>()(
  immer(
    devtools(
      (set, get) => ({
        isAuth: false,
        setIsAuth: (isAuth: boolean) => {
          set((state) => {
            state.isAuth = isAuth;
          });
        },

        user: {
          userId: null,
          username: '',
          email: ''
        },
        setUser: (user: User) => {
          set((state) => {
            state.user = user;
          });
        },
        clearUser: () => {
          set((state) => {
            state.user = {
              userId: null,
              username: '',
              email: ''
            };
          });
        }
      }),
      {
        name: 'auth-store'
      }
    )
  )
)