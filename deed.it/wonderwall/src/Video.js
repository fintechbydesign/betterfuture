import React from 'react';

function Video(props) {
  return (<video src={props.src} autoPlay loop height={props.height} width={props.width} onClick={props.onClick} />);
}

export default Video;