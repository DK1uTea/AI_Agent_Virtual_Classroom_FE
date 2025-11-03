'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { Maximize, Pause, Play, Settings, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const VideoControls = () => {
  const {
    showControls,
  } = useVideoPlayerStore(useShallow((state) => ({
    showControls: state.showControls,
  })));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

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
            00:00 / 15:30
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
              <DropdownMenuItem onClick={() => setPlaybackSpeed(0.5)}>
                Speed: 0.5x {playbackSpeed === 0.5 && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPlaybackSpeed(0.75)}>
                Speed: 0.75x {playbackSpeed === 0.75 && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPlaybackSpeed(1)}>
                Speed: 1x {playbackSpeed === 1 && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPlaybackSpeed(1.25)}>
                Speed: 1.25x {playbackSpeed === 1.25 && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPlaybackSpeed(1.5)}>
                Speed: 1.5x {playbackSpeed === 1.5 && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPlaybackSpeed(2)}>
                Speed: 2x {playbackSpeed === 2 && '✓'}
              </DropdownMenuItem>
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
