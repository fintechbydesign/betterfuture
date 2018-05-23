import React from 'react';
import './Component.css'
import './Dropdown.css';

function Dropdown (props) {
  const onChange = props.onChange ? (event) => props.onChange(event.target.value) : null;
  return (
    <select className='Dropdown-default Component-default' onChange={onChange} >
      {props.options.map((option, index) => <option key={index} value={option} >{option}</option>)}
    </select>
  );
}

export default Dropdown;
