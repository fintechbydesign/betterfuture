import React from 'react';
import './Button.css';

function Button (props) {
  const { className, click, text } = props;
  const btnClass = (className) ? `${className} Button_default` : 'Button_default';
  return (
    <button className={btnClass} onClick={click}>
      {text}
    </button>
  );
}

export default Button;
