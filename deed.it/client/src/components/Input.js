import React from 'react';
import './Component.css';
import './Input.css';

function Input (props) {
  const inputProps = {
    ...props,
    className: 'Input-default Component-default',
    type: 'text',
    onChange: props.onChange ? (event) => props.onChange(event.target.value) : null
  };
  return (
    <input {...inputProps} />
  );
}

export default Input;
