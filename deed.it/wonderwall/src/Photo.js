import React from 'react';

function Photo (props) {
  const height = props.isPopup ? '480' : '240';
  const src = props.isPopup ? props.src : props.smallSrc;
  const onClick = props.isPopup
    ? null
    : props.setPopupContent.bind(null, (<Photo isPopup {...props} alt='deed evidence' />));
  return (<img src={src} height={height} alt='deed evidence' onClick={onClick} />);
}

export default Photo;
