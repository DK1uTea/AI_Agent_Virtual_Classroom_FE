'use client';

import { cn, documentDispatchEvent } from "@/lib/utils";
import { useLessonStore } from "@/stores/lesson-store";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

const SEEK_STEP = 5;

const MobileVideoOverlay = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    videoRef,
    showControls,
    setShowControls,
  } = useVideoPlayerStore(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      setIsPlaying: state.setIsPlaying,
      currentTime: state.currentTime,
      duration: state.duration,
      videoRef: state.videoRef,
      showControls: state.showControls,
      setShowControls: state.setShowControls,
    }))
  );

  const { currentLesson } = useLessonStore(
    useShallow((state) => ({
      currentLesson: state.currentLesson,
    }))
  );

  const isVideoCompleted = useMemo(() => {
    return currentLesson?.completed?.videoCompleted ?? false;
  }, [currentLesson?.completed?.videoCompleted]);

  const [overlayAnimation, setOverlayAnimation] = useState<{
    type: 'backward' | 'forward';
    id: number;
  } | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const triggerAnimation = (type: 'backward' | 'forward') => {
    setOverlayAnimation({ type, id: Date.now() });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOverlayAnimation(null);
    }, 600);
  };

  const handlePlayPause = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    // triggerAnimation(nextState ? 'play' : 'pause');
    // Also ensure controls are shown briefly or toggled if desired,
    // but usually tapping center just toggles play/pause.
    // We might want to show controls to indicate change.
    setShowControls(true);
  };

  const handleSkipBack = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const baseTime = videoRef?.currentTime ?? currentTime;
    const newTime = Math.max(0, baseTime - SEEK_STEP);
    requestAnimationFrame(() => {
      documentDispatchEvent("seekChange", { time: newTime });
    });
    triggerAnimation('backward');
    setShowControls(true);
  };

  const handleSkipForward = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isVideoCompleted) return;

    const durationSafe = videoRef?.duration ?? duration;
    const baseTime = videoRef?.currentTime ?? currentTime;
    if (!Number.isFinite(durationSafe)) return;

    const newTime = Math.min(durationSafe, baseTime + SEEK_STEP);
    requestAnimationFrame(() => {
      documentDispatchEvent("seekChange", { time: newTime });
    });
    triggerAnimation('forward');
    setShowControls(true);
  };

  const handleContainerClick = () => {
    setShowControls(!showControls);
  };

  return (
    <div
      className="absolute inset-0 z-10 flex touch-manipulation"
      onClick={handleContainerClick}
    >
      {/* Left Zone - Seek Backward */}
      <div
        className="h-full w-[30%] md:hidden flex items-center justify-center active:bg-white/5 transition-colors"
        onDoubleClick={handleSkipBack}
      />

      {/* Center Zone - Play/Pause */}
      <div
        className="h-full w-[40%] md:w-full flex items-center justify-center active:bg-white/5 transition-colors group"
        onClick={handlePlayPause}
      >
        {!isPlaying && (
          <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <Play className="w-8 h-8 md:w-12 md:h-12 text-white fill-white ml-1" />
          </div>
        )}
      </div>

      {/* Right Zone - Seek Forward */}
      <div
        className="h-full w-[30%] md:hidden flex items-center justify-center active:bg-white/5 transition-colors"
        onDoubleClick={handleSkipForward}
      />

      {/* Animation Overlay Centered */}
      {overlayAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-300">
          <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm">
            {/* Play/Pause animations removed in favor of persistent Play icon */}
            {overlayAnimation.type === 'backward' && (
              <div className="flex flex-col items-center text-white">
                <RotateCcw className="w-8 h-8" />
                <span className="text-xs font-bold mt-1">-5s</span>
              </div>
            )}
            {overlayAnimation.type === 'forward' && (
              <div className="flex flex-col items-center text-white">
                <RotateCw className="w-8 h-8" />
                <span className="text-xs font-bold mt-1">+5s</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileVideoOverlay;
