import React from 'react';

function Dropdown (props) {
  return (
    <select>
      {props.options.map(option => <option value={option}>{option}</option>)}
    </select>
  );
}

export default Dropdown;
