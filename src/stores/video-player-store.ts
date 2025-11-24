import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type VideoPlayerState = {
  videoUrl: string;
  isPlaying: boolean;
  duration: number;
  currentSeekNumber: number;
  playbackRate: number;
  showControls: boolean;
}

type VideoPlayerAction = {
  setVideoUrl: (url: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setDuration: (duration: number) => void;
  setCurrentSeekNumber: (seek: number) => void;
  setPlaybackRate: (rate: number) => void;
  setShowControls: (show: boolean) => void;
}

type VideoPlayerStore = VideoPlayerState & VideoPlayerAction;

export const useVideoPlayerStore = create<VideoPlayerStore>()(
  immer(
    devtools(
      (set, get) => ({
        videoUrl: '',
        setVideoUrl: (url: string) => {
          set((state) => {
            state.videoUrl = url;
          });
        },
        isPlaying: false,
        setIsPlaying: (playing: boolean) => {
          set((state) => {
            state.isPlaying = playing;
          });
        },
        duration: 0,
        setDuration: (duration: number) => {
          set((state) => {
            state.duration = duration;
          });
        },
        currentSeekNumber: 0,
        setCurrentSeekNumber: (seek: number) => {
          set((state) => {
            state.currentSeekNumber = seek;
          });
        },
        playbackRate: 1,
        setPlaybackRate: (rate: number) => {
          set((state) => {
            state.playbackRate = rate;
          });
        },
        showControls: true,
        setShowControls: (show: boolean) => {
          set((state) => {
            state.showControls = show;
          });
        }
      })
    )
  )
)