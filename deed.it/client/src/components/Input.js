import React from 'react';
import './Dropdown.css';
import './Input.css';

function Input (props) {
  const onChange = props.onChange ? (event) => props.onChange(event.target.value) : null;
  return (
    <input className='Input-default Component-default' type={'text'} minLength='2' maxLength='20' onChange={onChange} />
  );
}

export default Input;
