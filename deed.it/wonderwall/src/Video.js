import React from 'react';

function Video(props) {
  const onClick = props.canPopup ?
    null :
    props.setPopupContent.bind(null, (<Video src={props.src} height='480' width='640' />));
  return (<video src={props.src} autoPlay loop height='240' width='320' onClick={onClick} />);
}

export default Video;