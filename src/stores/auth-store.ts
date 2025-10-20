import { User } from "@/types/user-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


type AuthState = {
  isAuth: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

type AuthStateAction = {
  setAuthState: (isAuth: boolean, user: User, accessToken: string, refreshToken: string) => void;
  clearAuthState: () => void;
}

type AuthStore = AuthState & AuthStateAction;

export const useAuthStore = create<AuthStore>()(
  immer(
    devtools(
      (set, get) => ({
        isAuth: false,
        user: {
          userId: null,
          username: '',
          email: ''
        },
        accessToken: '',
        refreshToken: '',
        setAuthState: (isAuth: boolean, user: User, accessToken: string, refreshToken: string) => {
          set((state) => {
            state.isAuth = isAuth;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
          });
        },
        clearAuthState: () => {
          set((state) => {
            state.isAuth = false;
            state.user = {
              userId: null,
              username: '',
              email: ''
            };
            state.accessToken = '';
            state.refreshToken = '';
          });
        },
      }),
      {
        name: 'auth-store'
      }
    )
  )
)