import React from 'react';

function Badge (props) {
  const height = props.isPopup ? '480' : '240';
  const onClick = props.isPopup
    ? null
    : props.setPopupContent.bind(null, (<Badge isPopup src={props.src} />));
  return (<img src={props.src} height={height} onClick={onClick} alt='a badge' />);
}

export default Badge;
