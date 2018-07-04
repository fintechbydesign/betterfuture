import React from 'react';
import './Component.css';
import './Dropdown.css';

function Dropdown (props) {
  const placeholder = (props.placeholder) ? props.placeholder : 'Select yor option';
  const onChange = (props.onChange) ? (event) => props.onChange(event.target.value) : null;
  const options = props.options.map((option, index) => <option key={index + 1} value={option} >{option}</option>);
  options.unshift((<option key='0' value='' disabled selected>{placeholder}</option>));
  return (
    <select className='Dropdown-default Component-default' onChange={onChange} >
      {options}
    </select>
  );
}

export default Dropdown;
