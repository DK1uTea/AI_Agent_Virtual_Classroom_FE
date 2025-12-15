'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn, formatTimer, documentDispatchEvent } from "@/lib/utils";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { useLessonStore } from "@/stores/lesson-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { debounce } from "es-toolkit";

const SEEK_STEP = 5; // skip 5s

const VideoControls = () => {
  const {
    videoRef,
    isPlaying,
    setIsPlaying,
    playbackRate,
    setPlaybackRate,
    currentTime,
    setCurrentTime,
    changeCurrentSeekNumber,
    changeCurrentSeek,
    duration,
    showControls,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    isFullscreen,
    setIsFullscreen,
  } = useVideoPlayerStore(
    useShallow((state) => ({
      videoRef: state.videoRef,
      isPlaying: state.isPlaying,
      setIsPlaying: state.setIsPlaying,
      playbackRate: state.playbackRate,
      setPlaybackRate: state.setPlaybackRate,
      currentTime: state.currentTime,
      setCurrentTime: state.setCurrentTime,
      changeCurrentSeekNumber: state.changeCurrentSeekNumber,
      changeCurrentSeek: state.changeCurrentSeek,
      duration: state.duration,
      showControls: state.showControls,
      volume: state.volume,
      setVolume: state.setVolume,
      isMuted: state.isMuted,
      setIsMuted: state.setIsMuted,
      isFullscreen: state.isFullscreen,
      setIsFullscreen: state.setIsFullscreen,
    }))
  );

  const { currentLesson } = useLessonStore(
    useShallow((state) => ({
      currentLesson: state.currentLesson,
    }))
  );

  // Check if video is completed - if not, disable seeking/skipping
  const isVideoCompleted = useMemo(() => {
    return currentLesson?.completed?.videoCompleted ?? false;
  }, [currentLesson?.completed?.videoCompleted]);

  const playbackRateOptions = useMemo(
    () => [0.5, 0.75, 1, 1.25, 1.5, 2],
    []
  );

  // Play / pause: controlled by state -> ReactPlayer receives prop `playing`
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Skip backward uses common event seek - always allowed
  const handleSkipBack = () => {
    const baseTime = videoRef?.currentTime ?? currentTime;
    const newTime = Math.max(0, baseTime - SEEK_STEP);
    requestAnimationFrame(() => {
      documentDispatchEvent("seekChange", { time: newTime });
    })
  };

  // Skip forward uses common event seek
  const handleSkipForward = () => {
    // Prevent skipping forward if video is not completed
    if (!isVideoCompleted) return;

    const durationSafe = videoRef?.duration ?? duration;
    const baseTime = videoRef?.currentTime ?? currentTime;
    if (!Number.isFinite(durationSafe)) return;

    const newTime = Math.min(durationSafe, baseTime + SEEK_STEP);
    requestAnimationFrame(() => {
      documentDispatchEvent("seekChange", { time: newTime });
    })
  };

  // Volume
  const handleVolumeChange = (v: number[]) => {
    const value = v[0];
    setVolume(value);
    setIsMuted(value === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  // Fullscreen
  const handleFullscreen = () => {
    const videoContainer = document.getElementById("video-container");
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Slider: instead of seeking directly, we dispatch an event
  // Only prevent seeking forward when video is not completed
  const handleSeekChange = useCallback((value: number[]) => {
    const newTime = value[0];

    // If video not completed, only allow seeking backward (to already watched content)
    if (!isVideoCompleted && newTime > currentTime) {
      return; // Block seeking forward
    }
    requestAnimationFrame(() => {
      documentDispatchEvent("seekChange", { time: newTime });
    })
  }, [isVideoCompleted, currentTime]);

  // Listen for seekChange + seekChangeDebounce
  useEffect(() => {
    // update UI immediately when has request to seek
    const handleSeek = (event: Event) => {
      const e = event as CustomEvent<{ time: number }>;
      const newTime = e.detail?.time;
      if (typeof newTime !== "number" || Number.isNaN(newTime)) return;

      // update UI (slider, timer)
      setCurrentTime(newTime);

      // dispatch debounced event to perform actual seek
      documentDispatchEvent("seekChangeDebounce", { time: newTime });
    };

    // perform actual seek (debounced)
    const performSeek = (event: Event) => {
      const e = event as CustomEvent<{ time: number }>;
      const newTime = e.detail?.time;
      if (typeof newTime !== "number" || Number.isNaN(newTime)) return;

      const el = videoRef;

      // If video is ready -> seek directly
      if (
        el &&
        Number.isFinite(el.duration) &&
        el.readyState >= HTMLMediaElement.HAVE_METADATA
      ) {
        el.currentTime = newTime;
      } else {
        // If not ready -> let VideoPlayer handle later
        changeCurrentSeek(newTime);
      }
    };

    const debouncedPerformSeek = debounce(performSeek, 400);

    document.addEventListener("seekChange", handleSeek as EventListener);
    document.addEventListener(
      "seekChangeDebounce",
      debouncedPerformSeek as unknown as EventListener
    );

    return () => {
      document.removeEventListener("seekChange", handleSeek as EventListener);
      document.removeEventListener(
        "seekChangeDebounce",
        debouncedPerformSeek as unknown as EventListener
      );
      debouncedPerformSeek.flush?.();
    };
  }, [videoRef, setCurrentTime, changeCurrentSeek]);

  useEffect(() => {
    if (!videoRef || !changeCurrentSeekNumber || !Number.isFinite(videoRef.duration || videoRef.readyState < HTMLMediaElement.HAVE_METADATA)) return;
    videoRef.currentTime = changeCurrentSeekNumber;
    changeCurrentSeek(null);
  }, [videoRef, changeCurrentSeekNumber]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);


  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity rounded-2xl",
        showControls ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Seek bar - allows backward seek, restricts forward seek when not completed */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Slider
                value={[currentTime]}
                max={duration || 0}
                min={0}
                step={1}
                onValueChange={handleSeekChange}
                className={cn(
                  "mb-4 cursor-pointer",
                  !isVideoCompleted && "[&_[data-disabled]]:cursor-not-allowed"
                )}
              />
            </div>
          </TooltipTrigger>
          {!isVideoCompleted && (
            <TooltipContent>
              <p>You can seek backward. Forward seeking unlocks at 90%</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center justify-between gap-4">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          {/* Play / Pause */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          {/* Skip back - always enabled */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={handleSkipBack}
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          {/* Skip forward - disabled when video not completed */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className={cn(
                      "text-white hover:bg-white/20",
                      !isVideoCompleted && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={handleSkipForward}
                    disabled={!isVideoCompleted}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </span>
              </TooltipTrigger>
              {!isVideoCompleted && (
                <TooltipContent>
                  <p>Watch 90% of the video to unlock skipping forward</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {/* Volume + slider */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleMuteToggle}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          {/* Time */}
          <span className="text-white text-sm">
            {formatTimer(currentTime)} / {formatTimer(duration)}
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Playback rate */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {playbackRateOptions.map((rate) => (
                <DropdownMenuItem
                  key={rate}
                  className={cn({
                    "bg-accent font-semibold": playbackRate === rate,
                  })}
                  onClick={() => setPlaybackRate(rate)}
                >
                  Speed: {rate}x {playbackRate === rate && "✓"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;

declare global {
  interface GlobalEventHandlersEventMap {
    seekChange: CustomEvent<{ time: number }>;
    seekChangeDebounce: CustomEvent<{ time: number }>;
  }
}
