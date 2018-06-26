import React from 'react';
import './Button.css';
import './Component.css';

const defaultClasses = 'Component-default Button-default';

function Button (props) {
  const className = props.className ? `${defaultClasses} ${props.className}` : defaultClasses;
  return (
    <button className={className} disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
