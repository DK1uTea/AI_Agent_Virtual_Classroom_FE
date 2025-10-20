import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type HeaderSidebarState = {
  isOpen: boolean;
}

type HeaderSidebarActions = {
  onOpen: () => void;
  onClose: () => void;
}

export type HeaderSidebarStore = HeaderSidebarState & HeaderSidebarActions;

export const useHeaderSidebarStore = create<HeaderSidebarStore>()(
  immer(
    devtools((set, get) => ({
      isOpen: false,
      onOpen: () => {
        set((state) => {
          state.isOpen = true;
        });
      },
      onClose: () => {
        set((state) => {
          state.isOpen = false;
        });
      }
    }))
  )
)