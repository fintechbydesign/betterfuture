import React from 'react';
import './EasterEgg.css';

function EasterEgg (props) {
  return (
    <span className='EasterEgg-text' onClick={props.onClick}>&nbsp;!&nbsp;</span>
  );
}

export default EasterEgg;
