import React from 'react';
import './Button.css';

function Button (props) {
  return <button onClick={props.click} className='Button-normal'>{props.text}</button>;
}

export default Button;
