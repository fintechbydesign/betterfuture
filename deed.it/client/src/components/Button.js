import React from 'react';
import './Button.css';
import './Component.css'

function Button (props) {
  return (
    <button className='Button-default Component-default'  disabled={props.disabled} onClick={props.click}>
      {props.text}
    </button>
  );
}

export default Button;
