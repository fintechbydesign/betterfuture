import React from 'react';

function Badge(props) {
  const onClick = props.canPopup ?
    null :
    props.setPopupContent.bind(null, (<img src={props.src} height='480' alt='a badge' />));
  return (<img src={props.src} height='240' onClick={onClick} alt='a badge' />);
}

export default Badge;