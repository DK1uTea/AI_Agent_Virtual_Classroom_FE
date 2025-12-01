import { MessageType } from "@/types/chat-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type SetMessagesListArg = MessageType[] | ((prev: MessageType[]) => MessageType[]);

type AIState = {
  messagesList: MessageType[];
}

type AIStateAction = {
  setMessagesList: (next: SetMessagesListArg) => void;
}

type AIStore = AIState & AIStateAction;

export const useAIStore = create<AIStore>()(
  immer(
    devtools(
      (set, get) => ({
        messagesList: [],
        setMessagesList: (next: SetMessagesListArg) => {
          set((state) => {
            if (typeof next === 'function') {
              state.messagesList = next(state.messagesList);
            } else {
              state.messagesList = next;
            }
          });
        },
      })
    )
  )
)