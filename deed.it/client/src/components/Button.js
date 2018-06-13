import React from 'react';
import './Button.css';
import './Component.css';

const defaultClasses = 'Button-default Component-default';

function Button (props) {
  const className = props.className ? `${defaultClasses} ${props.className}` : defaultClasses;
  return (
    <button className={className} disabled={props.disabled} onClick={props.click}>
      {props.text}
    </button>
  );
}

export default Button;
