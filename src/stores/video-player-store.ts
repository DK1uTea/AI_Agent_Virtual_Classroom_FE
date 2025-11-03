import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type VideoPlayerState = {
  showControls: boolean;
}

type VideoPlayerAction = {
  setShowControls: (show: boolean) => void;
}

type VideoPlayerStore = VideoPlayerState & VideoPlayerAction;

export const useVideoPlayerStore = create<VideoPlayerStore>()(
  immer(
    devtools(
      (set, get) => ({
        showControls: true,
        setShowControls: (show: boolean) => {
          set((state) => {
            state.showControls = show;
          });
        },


      })
    )
  )
)