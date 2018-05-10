import React from 'react';

function Video(props) {
  const height = props.height || '240';
  const width = props.width || '320';

  let mediaPlayer;

  const togglePlay = () => {
    if (mediaPlayer) {
      if (mediaPlayer.paused || mediaPlayer.ended) {
        mediaPlayer.play()
      } else {
        mediaPlayer.pause();
      }
    }
  };

  return (<video
    src={props.src}
    height={height}
    width={width}
    onClick={togglePlay}
    ref={(element) => {mediaPlayer = element}} />);
};

export default Video;
