import React from 'react';
import updateFlag from '../core/updateFlag';
import './UpdateNotification.css';

function UpdateNotification (props) {
  const { updateAvailable } = props;
  if (!window[updateFlag]) return null;
  const onClick = () => {
    delete (window[updateFlag]);
    updateAvailable();
  };
  return (
    <div className='UpdateNotification-text' onClick={onClick}>&nbsp;!&nbsp;</div>
  );
}

export default UpdateNotification;
