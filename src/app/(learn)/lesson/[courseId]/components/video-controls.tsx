'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn, documentDispatchEvent, formatTimer } from "@/lib/utils";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { Maximize, Minimize, Pause, Play, Settings, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import { debounce } from 'es-toolkit';

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
  } = useVideoPlayerStore(useShallow((state) => ({
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
  })));

  const playbackRateOptions = useMemo(() => [0.5, 0.75, 1, 1.25, 1.5, 2], []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {

  }

  const handleSkipForward = () => {

  };

  const handleVolumeChange = (v: number[]) => {
    setVolume(v[0]);
    if (v[0] === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSeekChangeCallback = useCallback((newTime: number) => {
    if (Number.isNaN(newTime)) return;
    const shouldCallDebounce = !videoRef?.current || videoRef.current.duration < 0 || videoRef.current.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA;
    if (shouldCallDebounce) {
      requestAnimationFrame(() => {
        documentDispatchEvent('seekChangeDebounce', {
          time: newTime,
        })
      })
      return;
    }
    setCurrentTime(newTime);
  }, [videoRef, setCurrentTime]);

  const handleSeekChange = useCallback(
    (value: number[]) => handleSeekChangeCallback(value[0]),
    [handleSeekChangeCallback]
  );

  useEffect(() => {
    const seekChangeHandleDetail = (e: CustomEvent<{ time: number }>) => {
      handleSeekChangeCallback(e.detail.time);
    }

    const seekChangeDebounce = debounce(seekChangeHandleDetail, 500);

    document.addEventListener('seekChange', seekChangeHandleDetail);

    document.addEventListener('seekChangeDebounce', seekChangeDebounce);

    return () => {
      document.removeEventListener('seekChange', seekChangeHandleDetail);
      document.removeEventListener('seekChangeDebounce', seekChangeDebounce);
      seekChangeDebounce.flush();
    }
  }, [handleSeekChangeCallback])

  return (
    <div className={cn('absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity rounded-2xl', showControls ? 'opacity-100' : 'opacity-0')}>

      <Slider
        value={[currentTime]}
        max={duration}
        min={0}
        step={1}
        onValueChange={handleSeekChange}
        className="cursor-pointer"
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={handlePlayPause}
          >
            {isPlaying ?
              <Pause className="h-5 w-5" />
              :
              <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={handleSkipBack}
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={handleSkipForward}
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleMuteToggle}
            >
              {
                isMuted || volume === 0 ?
                  <VolumeX className="h-5 w-5" />
                  :
                  <Volume2 className="h-5 w-5" />
              }
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          <span className="text-white">
            {formatTimer(currentTime)} / {formatTimer(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
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
                  className={cn({ "bg-accent font-semibold": playbackRate === rate })}
                  onClick={() => setPlaybackRate(rate)}>
                  Speed: {rate}x {playbackRate === rate && '✓'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
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