import React from 'react';
import loremIpsum from 'lorem-ipsum';
import './Text.css';

function Text(props) {
  const text = (typeof props.text === 'string') ? props.text : loremIpsum(props.text);
  return <div className='Text-text'>{text}</div>
};

export default Text;
