import { RefObject } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type VideoPlayerState = {
  videoRef: HTMLVideoElement | null;
  videoUrl: string;
  isPlaying: boolean;
  playbackRate: number;
  currentTime: number;
  changeCurrentSeekNumber: number | null;
  duration: number;
  volume: number;
  isMuted: boolean;
  showControls: boolean;
  isFullscreen: boolean;
}

type VideoPlayerAction = {
  setVideoRef: (el: HTMLVideoElement | null) => void;
  setVideoUrl: (url: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setCurrentTime: (time: number) => void;
  changeCurrentSeek: (changeCurrentSeekNumber: number | null) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean) => void;
  setShowControls: (show: boolean) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  resetPlayer: () => void;
}

type VideoPlayerStore = VideoPlayerState & VideoPlayerAction;

export const useVideoPlayerStore = create<VideoPlayerStore>()(
  immer(
    devtools(
      (set, get) => ({
        videoRef: null,
        setVideoRef: (el) => {
          set((state) => {
            (state as any).videoRef = el;
          });
        },

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

        playbackRate: 1,
        setPlaybackRate: (rate: number) => {
          set((state) => {
            state.playbackRate = rate;
          });
        },

        currentTime: 0,
        setCurrentTime: (time: number) => {
          set((state) => {
            state.currentTime = time;
          });
        },

        changeCurrentSeekNumber: null,
        changeCurrentSeek: (changeCurrentSeekNumber: number | null) => {
          set((state) => {
            state.changeCurrentSeekNumber = changeCurrentSeekNumber;
          });
        },

        volume: 100,
        setVolume: (volume: number) => {
          set((state) => {
            state.volume = volume;
          });
        },

        isMuted: false,
        setIsMuted: (muted: boolean) => {
          set((state) => {
            state.isMuted = muted;
          });
        },

        duration: 0,
        setDuration: (duration: number) => {
          set((state) => {
            state.duration = duration;
          });
        },

        showControls: true,
        setShowControls: (show: boolean) => {
          set((state) => {
            state.showControls = show;
          });
        },

        isFullscreen: false,
        setIsFullscreen: (fullscreen: boolean) => {
          set((state) => {
            state.isFullscreen = fullscreen;
          });
        },

        resetPlayer: () => {
          set((state) => {
            state.videoRef = null;
            state.videoUrl = '';
            state.isPlaying = false;
            state.playbackRate = 1;
            state.volume = 100;
            state.isMuted = false;
            state.duration = 0;
            state.showControls = true;
            state.isFullscreen = false;
          });
        },
      })
    )
  )
)