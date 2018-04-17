import React from 'react';

function Video (props) {
  const height = props.isPopup ? '480' : '240';
  const width = props.isPopup ? '640' : '320';
  const onClick = props.isPopup
    ? null
    : props.setPopupContent.bind(null, (<Video isPopup src={props.src} />));
  const muted = !props.isPopup;

  return (<video src={props.src} autoPlay loop muted={muted} height={height} width={width} onClick={onClick} />);
}

export default Video;
