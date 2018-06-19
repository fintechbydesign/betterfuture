import React from 'react';
import './RadioGroup.css';

function renderRadio (radioOption, index) {
  const { onChange, name, text } = radioOption;
  const id = `id_${index}`;
  return (
    <div key={id} >
      <input type='radio' id={id} name={name} onChange={onChange} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}

function RadioGroup (props) {
  const { radioOptions } = props;
  const radios = radioOptions.map(renderRadio);
  return (
    <fieldset className='RadioGroup_container'>
      {radios}
    </fieldset>
  );
}

export default RadioGroup;
