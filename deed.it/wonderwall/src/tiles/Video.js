import React from 'react';
import './Video.css'

function Video (props) {
  const { isPopup, setPopupContent, src } = props;
  const className = 'Video_appear';
  const height = isPopup ? '480' : '240';
  const width = isPopup ? '640' : '320';
  const onClick = isPopup
    ? null
    : setPopupContent.bind(null, (<Video isPopup src={props.src} />));
  const muted = !isPopup;
  const videoProps = { className, height, width, onClick, muted, src }
  return (<video autoPlay loop {...videoProps} />);
}

export default Video;
