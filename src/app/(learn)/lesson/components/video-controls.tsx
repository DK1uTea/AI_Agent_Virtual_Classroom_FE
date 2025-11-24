'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn, formatTimer } from "@/lib/utils";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { Maximize, Pause, Play, Settings, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const VideoControls = () => {
  const {
    isPlaying,
    currentSeekNumber,
    setCurrentSeekNumber,
    duration,
    playbackRate,
    setPlaybackRate,
    setIsPlaying,
    showControls,
  } = useVideoPlayerStore(useShallow((state) => ({
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
    currentSeekNumber: state.currentSeekNumber,
    setCurrentSeekNumber: state.setCurrentSeekNumber,
    duration: state.duration,
    playbackRate: state.playbackRate,
    setPlaybackRate: state.setPlaybackRate,
    showControls: state.showControls,
  })));

  const playbackRateOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);

  return (
    <div className={cn('absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity', showControls ? 'opacity-100' : 'opacity-0')}>

      <Slider />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
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
            onClick={() => {

            }}
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-white hover:bg-white/20"
            onClick={() => {

            }}
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button>
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
              onValueChange={(v) => {
                setVolume(v[0]);
                setIsMuted(v[0] === 0);
              }}
              className="w-20"
            />
          </div>

          <span className="text-white">
            {formatTimer(currentSeekNumber)} / {formatTimer(duration)}
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
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
