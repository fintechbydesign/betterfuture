import React from 'react';
import './Button.css';
import './Component.css'

function Button (props) {
  const className = props.className ? props.className : 'Button-default Component-default';
  return (
    <button className={className}  disabled={props.disabled} onClick={props.click}>
      {props.text}
    </button>
  );
}

export default Button;
