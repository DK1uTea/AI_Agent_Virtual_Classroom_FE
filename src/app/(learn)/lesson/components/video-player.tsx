'use client'

import { useVideoPlayerStore } from '@/stores/video-player-store';
import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';
import { set } from 'zod';
import { useShallow } from 'zustand/shallow';

const VideoPlayer = () => {

  const {
    videoRef,
    setVideoRef,
    videoUrl,
    isPlaying,
    setIsPlaying,
    playbackRate,
    currentTime,
    setCurrentTime,
    changeCurrentSeekNumber,
    changeCurrentSeek,
    setDuration,
    volume,
    isMuted,
    resetPlayer,
  } = useVideoPlayerStore(useShallow((state) => ({
    videoRef: state.videoRef,
    setVideoRef: state.setVideoRef,
    videoUrl: state.videoUrl,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
    playbackRate: state.playbackRate,
    currentTime: state.currentTime,
    setCurrentTime: state.setCurrentTime,
    changeCurrentSeekNumber: state.changeCurrentSeekNumber,
    changeCurrentSeek: state.changeCurrentSeek,
    setDuration: state.setDuration,
    volume: state.volume,
    isMuted: state.isMuted,
    resetPlayer: state.resetPlayer,
  })));

  const playerRef = useRef<any>(null);


  useEffect(() => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer() as HTMLVideoElement;
      if (internalPlayer) {
        setVideoRef({ current: internalPlayer });
      }
    }
  }, [setVideoRef])

  useEffect(() => {
    if (changeCurrentSeekNumber !== null && playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer() as HTMLVideoElement;
      if (internalPlayer) {
        internalPlayer.currentTime = changeCurrentSeekNumber;
        setCurrentTime(changeCurrentSeekNumber);
      }
      changeCurrentSeek(null);
    }
  }, [changeCurrentSeekNumber, changeCurrentSeek, setCurrentTime]);

  if (!videoUrl || videoUrl.trim() === '') {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <p className="text-white text-center">No video available</p>
      </div>
    );
  }

  return (
    <ReactPlayer
      ref={playerRef}
      src={videoUrl}
      controls={false}
      playing={isPlaying}
      volume={isMuted ? 0 : volume / 100}
      muted={isMuted}
      playbackRate={playbackRate}
      width={'100%'}
      height={'100%'}
      crossOrigin='anonymous'
      loop={false}
      onTimeUpdate={(e) => {
        if (e.currentTarget.currentTime !== 0) {
          setCurrentTime(e.currentTarget.currentTime);
        }
      }}
      onCanPlay={(e) => {
        setDuration(e.currentTarget.duration);
      }}
      onEnded={(e) => {
        setIsPlaying(false);
      }}
      onError={(e) => {
        const error = e.currentTarget.error;
        if (!error) return;
        resetPlayer();
        toast.error(`Video playback error: ${error.message}`);
      }}
    />
  );
};

export default VideoPlayer;