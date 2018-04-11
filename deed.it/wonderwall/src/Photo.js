import React from 'react';

function Photo(props) {
  const onClick = props.canPopup ?
    null :
    props.setPopupContent.bind(null, (<img src={props.src} height='480' alt='deed evidence' />));
  return (<img src={props.smallSrc} alt='deed evidence' onClick={onClick}/>);
}

export default Photo;