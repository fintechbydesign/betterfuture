import React from 'react';
import './Text.css';

const getContent = (content, index) => {
  return (typeof content === 'string')
    ? (<span key={index}>{content}</span>)
    : content;
}
const getContents = (contents) => contents.map(getContent);

function Text (props) {
  const { className, containerType, contents, htmlFor, style, text } = props;
  const ContainerType = (containerType) ? containerType : 'div';
  const divClassName = className ? `Text-text ${className}` : 'Text-text';
  const divContents = (contents)
    ? getContents(contents)
    : (text)
    ? text
    : 'Missing Text';
  return <ContainerType className={divClassName} htmlFor={htmlFor} style={style}>{divContents}</ContainerType>;
}

export default Text;
