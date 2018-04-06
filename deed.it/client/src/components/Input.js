import React from 'react';

function Input (props) {
  const onChange = props.onChange ? (event) => props.onChange(event.target.value) : null;
  return (
    <input type={'text'} minLength='2' maxLength='20' onChange={onChange} />
  );
}

export default Input;
