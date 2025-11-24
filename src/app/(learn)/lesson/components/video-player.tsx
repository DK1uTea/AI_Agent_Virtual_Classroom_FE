'use client'

import { useVideoPlayerStore } from '@/stores/video-player-store';
import ReactPlayer from 'react-player';
import { useShallow } from 'zustand/shallow';

const VideoPlayer = () => {

  const {
    videoUrl,
  } = useVideoPlayerStore(useShallow((state) => ({
    videoUrl: state.videoUrl,
  })));

  return (
    <ReactPlayer
      src={videoUrl}
      controls={false}
      width={'100%'}
      height={'100%'}
      crossOrigin='anonymous'
    />
  );
};

export default VideoPlayer;