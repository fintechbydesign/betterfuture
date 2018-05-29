import React from 'react';

function Dropdown (props) {
  const onChange = props.onChange ? (event) => props.onChange(event.target.value) : null;
  return (
    <select onChange={onChange} >
      {props.options.map((option, index) => <option key={index} selected={option === props.initialValue} value={option} >{option}</option>)}
    </select>
  );
}

export default Dropdown;
