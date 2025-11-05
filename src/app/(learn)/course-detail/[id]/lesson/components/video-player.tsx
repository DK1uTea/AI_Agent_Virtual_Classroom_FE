'use client'

import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  return (
    <ReactPlayer
      src='https://www.youtube.com/watch?v=w-wdCNfPCus&list=RDw-wdCNfPCus&start_radio=1'
      controls={true}
      width={'100%'}
      height={'100%'}
      crossOrigin='anonymous'
    />
  );
};

export default VideoPlayer;