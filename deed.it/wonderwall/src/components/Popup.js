import React from 'react';
import './Popup.css';

function Popup (props) {
  if (props.content && !props.menuVisible) {
    const closePopup = props.setPopupContent.bind(null, null);
    return (<div className='Popup' onClick={closePopup}>{props.content}</div>);
  } else {
    return null;
  }
}

export default Popup;
