import React from 'react';
import './Title.css';

function Title (props) {
  const { className, text } = props;
  const divClassName = className ? `Title-text ${className}` : 'Title-text';
  return <div className={divClassName}>{text}</div>;
}

export default Title;
